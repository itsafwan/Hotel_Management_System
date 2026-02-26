import ResponsiveAppBar from "../components/Navbar";

function HomePage() {

  return (
    <>
      <ResponsiveAppBar />
      <div className="container mt-4">
        <h1>Hotel Management System</h1>
        <p>Welcome to our hotel website</p>
        
      </div>
      
    </>
  );
}

export default HomePage;