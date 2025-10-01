import { motion } from "framer-motion";

function About() {
  const sectionStyle = {
    padding: "4rem 0",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    textAlign: "center",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
    boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    textAlign: "center",
    transition: "transform 0.3s ease",
  };

  const teamMemberVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <div className="w-full bg-white text-gray-800 font-sans">
      

      {/* Image Hero */}
      <section style={{ position: "relative", background: "#f9fafb", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <motion.img
            src="https://images.pexels.com/photos/8638308/pexels-photo-8638308.jpeg"
            style={{
              borderRadius: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              display: "block",
              margin: "0 auto",
              width: "100%",
              maxHeight: "550px",
              objectFit: "cover",
            }}
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          <div style={{ marginTop: "40px", maxWidth: "800px", marginInline: "auto" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "20px", color: "#111827" }}>
              Welcome to Our Online Store
            </h1>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#4b5563", marginBottom: "30px" }}>
              Discover high-quality products at unbeatable prices. Shop with confidence
              and enjoy a seamless shopping experience, backed by our trusted customer service.
            </p>
            <a
              href="/products"
              style={{
                display: "inline-block",
                background: "#16a34a",
                color: "#fff",
                padding: "12px 30px",
                borderRadius: "8px",
                fontWeight: "600",
                textDecoration: "none",
                boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "#15803d")}
              onMouseOut={(e) => (e.target.style.background = "#16a34a")}
            >
             
            </a>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section style={{ padding: "80px 20px", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "50px", color: "#111827" }}>
            Why Shop With Us?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {/* Card 1 */}
            <motion.div
              style={{
                background: "#e0f7fa",
                borderRadius: "20px",
                padding: "40px 30px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 12px 25px rgba(0,0,0,0.15)" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💎</div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "10px" }}>
                Trusted Quality
              </h3>
              <p style={{ fontSize: "1rem", color: "#374151" }}>
                We only source from verified and ethical suppliers.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              style={{
                background: "#e8f5e9",
                borderRadius: "20px",
                padding: "40px 30px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 12px 25px rgba(0,0,0,0.15)" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💰</div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "10px" }}>
                Best Prices
              </h3>
              <p style={{ fontSize: "1rem", color: "#374151" }}>
                Enjoy everyday low prices with exclusive deals.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              style={{
                background: "#ede7f6",
                borderRadius: "20px",
                padding: "40px 30px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 12px 25px rgba(0,0,0,0.15)" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌍</div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "10px" }}>
                Worldwide Delivery
              </h3>
              <p style={{ fontSize: "1rem", color: "#374151" }}>
                We ship to over 50+ countries around the globe.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={titleStyle}>Meet Our Team</h2>
          <motion.div
            style={{ ...gridStyle, gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { delayChildren: 0.3, staggerChildren: 0.2 },
              },
            }}
          >
            {[
              { name: "Sarah Johnson", role: "Founder", img: "https://i.pravatar.cc/300?img=47" },
              { name: "Michael Lee", role: "Operations Manager", img: "https://i.pravatar.cc/300?img=12" },
              { name: "Emma Davis", role: "Marketing Head", img: "https://i.pravatar.cc/300?img=32" },
            ].map((member, idx) => (
              <motion.div key={idx} style={cardStyle} variants={teamMemberVariants}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
          backgroundImage: "linear-gradient(45deg, #6366f1, #3b82f6)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "16px" }}>
          Ready to Experience Premium Shopping?
        </h2>
        <p style={{ fontSize: "1.125rem", marginBottom: "24px" }}>
          Join thousands of satisfied customers today.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a
            href="/products"
            style={{
              backgroundColor: "#fff",
              color: "#4f46e5",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600",
              textDecoration: "none",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
          >
            Browse Our Products
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
