import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// This would normally come from a database or CMS
const projects: Record<string, any> = {
  "forex-predictor": {
    title: "Forex Predictor (end-to-end)",
    summary: "Backtested signal generation for FX pairs — 12% annualized return on historical test set.",
    problem: "Foreign exchange markets are highly volatile and difficult to predict. Traditional technical analysis alone often fails to capture complex market dynamics.",
    approach: "Built an end-to-end ML pipeline combining feature engineering from technical indicators, sentiment analysis, and ensemble learning. Implemented rigorous backtesting framework to validate signals.",
    tools: ["Python", "Pandas", "XGBoost", "LightGBM", "Streamlit", "Docker", "PostgreSQL"],
    results: [
      "12% annualized return on 2-year historical backtest",
      "Sharpe ratio of 1.8, demonstrating risk-adjusted performance",
      "Deployed as interactive Streamlit dashboard for real-time signals",
    ],
    github: "https://github.com/enatandereje/forex-predictor",
    demo: "https://forex-predictor-demo.streamlit.app",
    howToReproduce: `
1. Clone the repository:
   \`git clone https://github.com/enatandereje/forex-predictor.git\`

2. Install dependencies:
   \`pip install -r requirements.txt\`

3. Download historical data:
   \`python scripts/download_data.py --pairs EURUSD,GBPUSD\`

4. Train models:
   \`python train.py --config configs/ensemble.yaml\`

5. Run backtest:
   \`python backtest.py --start 2020-01-01 --end 2022-12-31\`

6. Launch dashboard:
   \`streamlit run app.py\`
    `,
  },
  "medical-diagnosis": {
    title: "Medical Diagnosis Predictor",
    summary: "ML model for disease prediction based on symptoms with 94% accuracy.",
    problem: "Early disease detection is critical but access to specialists is limited in many regions. Need for automated preliminary diagnosis tool.",
    approach: "Created a multi-class classification model using ensemble methods. Implemented comprehensive data preprocessing, feature selection, and hyperparameter tuning.",
    tools: ["Python", "Scikit-learn", "Flask", "Docker", "Pandas", "NumPy"],
    results: [
      "94% accuracy across 15 disease categories",
      "False negative rate < 3% for critical conditions",
      "RESTful API serving 1000+ predictions/day in production",
    ],
    github: "https://github.com/enatandereje/medical-diagnosis",
    howToReproduce: `
1. Clone and setup:
   \`git clone https://github.com/enatandereje/medical-diagnosis.git\`
   \`cd medical-diagnosis && pip install -r requirements.txt\`

2. Prepare data:
   \`python data/prepare_dataset.py\`

3. Train model:
   \`python train.py --model ensemble\`

4. Run API:
   \`python api/app.py\`
    `,
  },
};

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section pt-32 pb-12 bg-light-surface dark:bg-dark-surface/50">
        <div className="container-custom">
          <Link
            href="/projects"
            className="inline-flex items-center text-accent hover:text-accent-hover mb-6"
          >
            ← Back to Projects
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            {/* Problem */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Problem
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Approach */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Approach
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {project.approach}
              </p>
            </div>

            {/* Tools */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Tools & Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool: string) => (
                  <span key={tool} className="badge">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Results & Impact
              </h2>
              <ul className="space-y-2">
                {project.results.map((result: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-light-text-secondary dark:text-dark-text-secondary"
                  >
                    <span className="text-accent mt-1">✓</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Reproduce */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                How to Reproduce
              </h2>
              <div className="card bg-dark-surface p-6">
                <pre className="text-sm text-dark-text font-mono overflow-x-auto whitespace-pre-wrap">
                  {project.howToReproduce.trim()}
                </pre>
              </div>
            </div>

            {/* Optional: Embedded Demo Placeholder */}
            {project.demo && (
              <div>
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                  Interactive Demo
                </h2>
                <div className="card p-4">
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                    Embedded demo (Streamlit/Gradio iframe):
                  </p>
                  <div className="aspect-video bg-dark-surface rounded-lg flex items-center justify-center">
                    <p className="text-dark-text-secondary">
                      Demo iframe would load here
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
