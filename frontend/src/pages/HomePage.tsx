import { Layout } from "@/components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center p-4">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Welcome to MediCare Hospital</h1>
        <p className="text-lg text-muted-foreground mb-8">Your trusted partner in health and wellness.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Our Facilities</h2>
            <ul className="list-disc list-inside text-left text-muted-foreground">
              <li>State-of-the-art Surgery Suites</li>
              <li>24/7 Emergency Care</li>
              <li>Advanced Diagnostic Imaging</li>
              <li>Comfortable Patient Rooms</li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Specialties</h2>
            <ul className="list-disc list-inside text-left text-muted-foreground">
              <li>Cardiology</li>
              <li>Pediatrics</li>
              <li>Orthopedics</li>
              <li>Dermatology</li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-muted-foreground">123 Hospital Ave, Health City</p>
            <p className="text-muted-foreground">Phone: (123) 456-7890</p>
            <p className="text-muted-foreground">Email: info@medicare.com</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
