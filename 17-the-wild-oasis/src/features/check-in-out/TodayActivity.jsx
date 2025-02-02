import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import TodayItem from "./TodayItem";
import Spinner from "../../ui/Spinner";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow-y: auto;
  overflow-x: hidden;
  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { todayActivity, isLoading, error } = useTodayActivity();
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {isLoading && <Spinner />}
      {!isLoading &&
        (todayActivity.length > 0 ? (
          <TodayList>
            {todayActivity.map((activity, index) => (
              <TodayItem key={index} booking={activity} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today ...</NoActivity>
        ))}
    </StyledToday>
  );
}

export default TodayActivity;
