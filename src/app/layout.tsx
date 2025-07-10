
import type {Metadata} from 'next';
import './globals.css';
import { Providers } from '@/components/app/providers';

export const metadata: Metadata = {
  title: 'Connect Hub 2.0: Gospel Remix',
  description: 'A modern social and spiritual platform for churches.',
};

const AIMetadata = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Connect Hub 2.0: Gospel Remix",
        "description": "A modern social and spiritual platform for churches, featuring a real-time prayer wall, sermon remixing, event management, and a personalized social feed.",
        "applicationCategory": "SocialNetworking",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0"
        },
        "creator": {
            "@type": "Organization",
            "name": "Connect Hub Developers"
        },
        "featureList": [
            "User Authentication",
            "Real-time Prayer Requests",
            "Personal Journaling",
            "Social Feed",
            "Profile Management",
            "Terms & Conditions Management",
            "Sermon Remixing",
            "Event Management",
            "Online Giving",
            "Mentorship"
        ],
        "softwareVersion": "2.0.0",
        "programmingLanguage": ["TypeScript", "React", "Next.js"],
        "runtimePlatform": "Node.js",
        "supportingData": [
            {"@type": "DataType", "name": "User Profiles"},
            {"@type": "DataType", "name": "Prayer Requests"},
            {"@type": "DataType", "name": "Journal Entries"},
            {"@type": "DataType", "name": "Social Posts"},
            {"@type": "DataType", "name": "Authentication Tokens"}
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <meta name="ai:purpose" content={structuredData.description} />
            <meta name="ai:type" content="webapp" />
            <meta name="ai:features" content={structuredData.featureList.join(', ')} />
            <meta name="ai:data-types" content={structuredData.supportingData.map(d => d.name).join(', ')} />
            <meta name="ai:framework" content="Next.js" />
            <meta name="ai:language" content="TypeScript" />
            <meta name="ai:database" content="Firebase Firestore" />
            <meta name="ai:auth" content="Firebase Authentication" />
        </>
    );
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <AIMetadata />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
