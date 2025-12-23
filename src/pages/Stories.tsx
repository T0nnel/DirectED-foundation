import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsSection } from "@/components/NewsSection";
import { motion } from "framer-motion";
import news1 from "@/assets/image5.jpg";
import news2 from "@/assets/image6.jpg";
import news3 from "@/assets/image7.jpg";

const Stories = () => {
  const allStories = [
    {
      id: 1,
      image: news1,
      category: "Education",
      date: "December 20, 2025",
      title: "New Technology Learning Center Opens in Rural Kenya",
      excerpt: "Bringing digital education to underserved communities with state-of-the-art facilities.",
      link: "/stories/1",
    },
    {
      id: 2,
      image: news2,
      category: "Success Story",
      date: "December 18, 2025",
      title: "Graduate Lands Software Engineering Role at Major Tech Company",
      excerpt: "From coding bootcamp to international career: Sarah's inspiring journey.",
      link: "/stories/2",
    },
    {
      id: 3,
      image: news3,
      category: "Events",
      date: "December 15, 2025",
      title: "Youth Tech Summit Showcases Innovative Solutions",
      excerpt: "Young entrepreneurs present groundbreaking projects at annual pitch competition.",
      link: "/stories/3",
    },
    {
      id: 4,
      image: news1,
      category: "Partnership",
      date: "December 10, 2025",
      title: "Major Tech Company Joins as Corporate Partner",
      excerpt: "New partnership opens doors for internship opportunities and mentorship programs.",
      link: "/stories/4",
    },
    {
      id: 5,
      image: news2,
      category: "Alumni",
      date: "December 5, 2025",
      title: "Alumni Network Reaches 500 Members Milestone",
      excerpt: "Growing community of tech professionals supporting the next generation.",
      link: "/stories/5",
    },
    {
      id: 6,
      image: news3,
      category: "Research",
      date: "December 1, 2025",
      title: "New Study Reveals Impact of Digital Skills Training",
      excerpt: "Data shows significant improvement in employment outcomes for graduates.",
      link: "/stories/6",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-primary py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Stories
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Discover the inspiring journeys, achievements, and impact of our community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stories Grid */}
        <NewsSection
          title="Latest Stories"
          subtitle="Real stories of transformation and success"
          cards={allStories}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Stories;
