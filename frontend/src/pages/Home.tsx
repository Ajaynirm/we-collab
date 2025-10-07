import { Button } from "@/components/ui/button";
import { Navbar } from "./NavBar";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare, Users, BarChart3, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl"
        >
          Organize tasks. Empower teams. <br />
          <span className="text-primary">Collaborate effortlessly.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-muted-foreground mt-6 max-w-2xl"
        >
          Manage projects, track progress, and communicate with your team — all in one beautiful platform designed for productivity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 mt-8"
        >
          <Button size="lg">Start Free</Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </motion.div>

        {/* Background gradients */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[150px]" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything you need to <span className="text-primary">get things done</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Task Management",
                desc: "Create, organize, and prioritize tasks with ease. Stay focused and on track.",
                icon: CheckSquare,
              },
              {
                title: "Team Collaboration",
                desc: "Chat, share files, and update progress — all in real-time.",
                icon: Users,
              },
              {
                title: "Analytics & Reports",
                desc: "Gain insights into your productivity and project performance.",
                icon: BarChart3,
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 border border-border/60">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <f.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="collaboration" className="py-24">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="https://illustrations.popsy.co/gray/team-chat.svg"
            alt="Collaboration"
            className="w-full md:w-1/2"
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for <span className="text-primary">collaboration</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Connect your entire team in one shared workspace. Communicate with context, collaborate on projects, and deliver faster than ever.
            </p>
            <Button>
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to boost your team's productivity?</h2>
        <p className="mb-8 text-primary-foreground/90">
          Join thousands of teams using CollabSync to streamline their workflow.
        </p>
        <Button size="lg" variant="secondary">
          Get Started Free
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CollabSync. All rights reserved.
      </footer>
    </div>
    </div>

  );
};

export default Home;



