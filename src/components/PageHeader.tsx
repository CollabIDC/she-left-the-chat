import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

const PageHeader = ({ eyebrow, title, subtitle }: PageHeaderProps) => {
  return (
    <section className="bg-background pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="label-eyebrow">{eyebrow}</span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal mt-4 mb-5">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-lg text-charcoal/70 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          <span className="block w-20 h-px bg-gold mx-auto mt-8" />
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
