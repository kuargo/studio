import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>Last updated: July 9, 2025</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>

          <h2>1. Information We Collect</h2>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
          <ul>
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, First name and last name, Profile picture.</li>
            <li><strong>User-Generated Content:</strong> We collect the content you create, upload, or receive from others when using our services. This includes things like prayer requests, journal entries, social feed posts, and comments you write.</li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
          </ul>

          <h2>2. Use of Your Information</h2>
          <p>We use the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain our Service.</li>
            <li>To notify you about changes to our Service.</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our Service.</li>
            <li>To monitor the usage of our Service.</li>
            <li>To detect, prevent and address technical issues.</li>
          </ul>

          <h2>3. Data Storage and Security</h2>
          <p>Your information, including Personal Data, is stored on Firebase (a Google platform) servers. We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no internet-based site can be 100% secure and we cannot guarantee absolute security.</p>
          <p>Journal entries are private by default. Prayer requests and social feed posts are public within the app's community unless marked otherwise.</p>
          
          <h2>4. Your Data Rights</h2>
          <p>You have the right to access, update or delete the information we have on you. You can update your personal information directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.</p>

          <h2>5. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2>6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </CardContent>
      </Card>
    </div>
  );
}
