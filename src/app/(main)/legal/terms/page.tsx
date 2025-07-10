import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Terms of Service</CardTitle>
                <CardDescription>Last updated: July 9, 2025</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Welcome to Connect Hub! These terms and conditions outline the rules and regulations for the use of our application.</p>
                
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using our app, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using our app's particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.</p>

                <h2>2. User Content</h2>
                <p>Our app allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
                <p>You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third-party posts on or through the Service.</p>

                <h2>3. Prohibited Uses</h2>
                <p>You may use our app only for lawful purposes. You may not use our app:</p>
                <ul>
                    <li>In any way that violates any applicable national or international law or regulation.</li>
                    <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
                    <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
                    <li>To impersonate or attempt to impersonate the app, an app employee, another user, or any other person or entity.</li>
                </ul>

                <h2>4. Intellectual Property</h2>
                <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of the app creators and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the app creators.</p>
                
                <h2>5. Termination</h2>
                <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
                
                <h2>6. Changes to Terms</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                
                <h2>7. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us.</p>
            </CardContent>
        </Card>
    </div>
  );
}
