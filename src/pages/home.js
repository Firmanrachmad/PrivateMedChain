import { Container, Card, Button } from "react-bootstrap";
import { SiMongodb, SiEthereum } from "react-icons/si";
import { FaHospital } from "react-icons/fa";
import { useSelector } from "react-redux";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <div className="d-flex flex-column align-items-center mb-4">
            <FaHospital size={50} />
            <h1 className="text-center mb-0">Private EMR</h1>
          </div>

          <p className="text-center mb-4">
            Private EMR is an application that stores and distributes electronic
            medical record data using the concept of OffChain and OnChain
            storage. OffChain storage is supported by NoSQL database using
            MongoDB. And OnChain storage is supported by the use of the Ethereum
            Blockchain.
          </p>

          <div className="d-flex">
            {userInfo ? (
              <>
                <p className="text-center mb-4">
                  Welcome, {userInfo.name}!
                </p>
              </>
            ) : (
              <>
                <Button variant="success" href="/login" className="me-3">
                  Log In
                </Button>
              </>
            )}
          </div>

          <div className="mt-4">
            <span className="text-muted">Powered by:</span>
            <SiMongodb className="mx-2" size={32} />
            <SiEthereum className="mx-2" size={32} />
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
