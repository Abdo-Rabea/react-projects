import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(function () {
    getCabins()
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://nrgbqrcwswkjoqkioatw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
        alt="image was here"
      />
    </Row>
  );
}

export default Cabins;
