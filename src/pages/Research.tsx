import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Calendar, FileText } from "lucide-react";

const Research = () => {
  const reports = [
    {
      title: "Annual Impact Report 2025",
      date: "December 2025",
      type: "Annual Report",
      description: "Comprehensive overview of our achievements, challenges, and impact over the past year.",
    },
    {
      title: "Youth Tech Employment in East Africa",
      date: "November 2025",
      type: "Research Paper",
      description: "Analysis of tech job market trends and opportunities for young professionals.",
    },
    {
      title: "Digital Skills Gap Assessment",
      date: "October 2025",
      type: "Study",
      description: "Identifying the most in-demand skills in the global tech industry.",
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
                Research & Reports
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Data-driven insights into education, employment, and technology trends across Africa.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Reports List */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="space-y-6">
              {reports.map((report, index) => (
                <motion.article
                  key={report.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-accent">{report.type}</span>
                      <span className="text-muted-foreground text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {report.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {report.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{report.description}</p>
                    <div className="flex gap-3">
                      <Button variant="accent" size="sm">
                        Read Report <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 w-4 h-4" /> Download PDF
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Research;
