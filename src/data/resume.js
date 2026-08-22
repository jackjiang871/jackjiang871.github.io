export const profile = {
  name: "Jack S. Jiang",
  tagline: "aspiring game developer",
  location: "Seattle, WA",
  photo: "face.jpg",
  links: [
    { label: "itch.io", href: "https://yummypotato99.itch.io", icon: "gamepad", primary: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jack-s-jiang", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/jackjiang871", icon: "github" },
  ],
};

export const education = [
  {
    school: "University of California, Berkeley",
    place: "Berkeley, CA",
    detail: "B.S. in Electrical Engineering and Computer Science",
    dates: "Aug 2017 – May 2020",
  },
];

export const experience = [
  {
    company: "GoDaddy",
    place: "Kirkland, WA",
    title: "Software Development Engineer III",
    stack: "Javascript/Typescript, Node JS, React, Redux, AWS",
    dates: "May 2022 – Sep 2025",
    bullets: [
      "Led modernization of the social account connection flows (Facebook, Yelp, Google), migrating redirect-based integrations to a Node.js package that internal teams can integrate directly into their own GoDaddy surfaces. Reduced user drop-off rate by 50% by keeping users on a single page throughout the connection experience.",
      "Migrated on-prem services into AWS (Lambda, API Gateway, DynamoDB, ECS, Fargate), setting up monitoring and CI/CD (Github Actions, CloudFormation, CDK, CloudWatch, Elastic).",
      "Worked on services (Node JS, Elastic, Jenkins) responsible for integration with third party social providers.",
      "Worked closely with UX and product to design and implement front-end pages (React, Redux) for connecting to social providers and managing those connections, plus metrics and A/B testing (Mixpanel/Fullstory).",
    ],
  },
  {
    company: "Amazon",
    place: "Seattle, WA",
    title: "Software Development Engineer I",
    stack: "Java, Kotlin, Ruby, Spring, AWS",
    dates: "Aug 2020 – Apr 2022",
    bullets: [
      "Worked on customer-facing microservices (Java, Kotlin, Spring, Maven) responsible for sending emails/push notifications (SQS/SNS), coupon redemption, dynamically serving the front-end (HTML, CSS, Javascript), and processing receipt data (Lambda, DynamoDB).",
      "Owned and maintained the CI/CD pipelines for our services, implemented integration testing and request validation using pipeline as code (Ruby). Worked on the migration of our infrastructure to AWS (CloudFormation, CDK).",
      "Designed and implemented the backend for a coupon scanning feature (AWS IoT) with guidance from a mentor.",
      "Improved observability by implementing alarms, logging and metrics for new and existing customer-facing features, enabling developers to quickly identify issues and their root causes (CloudWatch, Elasticsearch, Kibana).",
      "Served as scrum master in an AGILE team, identifying and addressing pain points in a sprint and improving guidelines and processes.",
    ],
  },
  {
    company: "IBM Aspera",
    place: "Emeryville, CA",
    title: "Software Engineer Intern",
    stack: "Ruby on Rails, Node JS, Kafka, Redis, Docker, Kubernetes, Git",
    dates: "Jun 2019 – Aug 2019",
    bullets: [
      "Worked in an AGILE team to develop watermarking software using Ruby on Rails, created a debugging tool to log Kafka streams using Redis, and deployed to Docker and Kubernetes environments, rapidly speeding up the development process.",
      "Worked with mentors to integrate the Secure Package Delivery process into IBM Cloud by designing sequence diagrams in PlantUML to document REST calls and API endpoints.",
      "Created an MVP for a Slack App using Node.js that integrated Aspera high speed data transfer into Slack, letting users issue file transfer commands through Slack.",
    ],
  },
];

export const research = [
  {
    org: "Virginia Tech",
    dates: "Jun 2018 – Aug 2018",
    bullets: [
      "Programmed graphing software for a custom pH controller in a research lab setting using an Arduino Mega and Processing (Java) for the GUI, saving more than $10,000 in equipment costs.",
    ],
  },
  {
    org: "University of Arkansas",
    dates: "Jun – Jul 2016, Aug 2018 – Jan 2019",
    bullets: [
      "Programmed a data generator in R for the quantification of clustering features of points, resulting in publication.",
      "Worked on a nucleotide sequence search algorithm using Python and BioPython.",
    ],
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Java", "Kotlin", "Python", "Ruby", "C#", "R"] },
  { group: "Front-end", items: ["React", "Redux", "HTML/CSS", "Node.js"] },
  { group: "Cloud & infra", items: ["AWS Lambda", "API Gateway", "DynamoDB", "ECS/Fargate", "CloudFormation", "CDK", "Docker", "Kubernetes"] },
  { group: "Tooling", items: ["Github Actions", "Jenkins", "CloudWatch", "Elasticsearch", "Kafka", "Redis"] },
];
