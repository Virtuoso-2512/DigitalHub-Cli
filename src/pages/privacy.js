
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalParent";

export default function Privacy() {
    const {setNavbar} = GlobalState();
    setNavbar(true);

    const contents = ["WHAT INFORMATION DO WE COLLECT?", "HOW DO WE PROCESS YOUR INFORMATION?", "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?", "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?", "IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?", "HOW LONG DO WE KEEP YOUR INFORMATION?", "HOW DO WE KEEP YOUR INFORMATION SAFE?", "WHAT ARE YOUR PRIVACY RIGHTS?", "CONTROLS FOR DO-NOT-TRACK FEATURES", "DO WE MAKE UPDATES TO THIS NOTICE?", "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?", "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?"], details = [<p>Personal information you disclose to us that means We collect personal information that you or your admin provide to us.
        <br/><br/>
        We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information through our products and Services or when you participate in activities on the Services or otherwise when you contact us.
        <br/><br/>
        <b>Sensitive Information. We do not process sensitive information.</b> All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
        <br/><br/>
        <h4>Information automatically collected</h4>
        Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
        <br/><br/>
        <ul>
    <li><b>Payment Data : </b> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by Razorpay. You may find their privacy notice link(s) here: <b><a href="http://www.razorpay.com">http://www.razorpay.com</a> </b> .</li>
    <li><b>Application Data : </b> If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
<ol style={{textAlign:"left"}}><li><i>Geolocation Information :</i> We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings.</li>
<li><i>Mobile Device Access :</i> We may request access or permission to certain features from your mobile device, including your mobile device's camera, contacts, microphone, storage, and other features. If you wish to change our access or permissions, you may do so in your device's settings.</li>
<li><i>Mobile Device Data :</i> We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our application(s), we may also collect information about the phone network associated with your mobile device, your mobile device’s operating system or platform, the type of mobile device you use, your mobile device's unique device ID, and information about the features of our application(s) you accessed.</li>
<li><i>Push Notifications :</i> We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.</li>
<li>Your IP address, Other information such as interests and preferences and/or Data profile regarding your online behavior on our website.</li></ol></li>
</ul>
<br/><br/>
        We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. 
        <br/><br/>
        <i>This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.</i> Like most of the websites, We also collect information through cookies and similar technologies.
        </p>, <p>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
        <br/><br/>
We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
<ol style={{textAlign:"left"}}>
    <li><b>To facilitate account creation, authentication and otherwise manage user accounts : </b> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
<li><b>To deliver and facilitate delivery of services to the user :</b> We may process your information to provide you with the requested service.</li>
<li><b>To respond to user inquiries/offer support to users :</b> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
<li><b>To send administrative information to you : </b> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
<li><b>To enable user-to-user communications :</b> We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
<li><b>To protect our Services : </b> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
<li><b>To evaluate and improve our Services, products, marketing, and your experience :</b> We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.</li>
<li><b>To identify usage trends :</b> We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
<li><b>To comply with our legal obligations :</b> We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.</li>
</ol>
<br/>
This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes. All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
</p>, <p>
We may share information in specific situations described in this section and/or with the following third parties.
<br/><br/>
We may need to share your personal information in the following situations:
<br/><br/>
<b>Business Transfers : </b> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
<br/><br/>
<b>Affiliates : </b> We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.<br/><br/>
<b>Business Partners : </b> We may share your information with our business partners to offer you certain products or services.<br/><br/>
<b>Legal Reasons : </b> We may share your information with the courts or legal entities in India to comply with the law.<br/><br/>
<b>Other Users : </b> When you share personal information (for example, by posting comments, contributions, or other content to the Services) or otherwise interact with public areas of the Services, such personal information may be viewed by all users and may be publicly made available outside the Services in perpetuity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Services, and view your profile.

</p>, <p>We may use cookies and other tracking technologies to collect and store your information.
<br/><br/>
Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online behavior (analyze web traffic, webpages you spend the most time on, and websites you visit).<br/><br/>
The data we collect by using cookies is used to customize our website to your needs. After we use the data for statistical analysis, the data is completely removed from our systems.<br/><br/>
Please note that cookies do not allow us to gain control of your computer in any way. They are strictly used to monitor which pages you find useful and which you do not so that we can provide a better experience for you.<br/><br/>
If you want to disable cookies, you can do it by accessing the cookie settings of your internet browser (chrome, edge, firefox).
</p>, <p>We may transfer, store, and process your information in countries other than your own.
<br/><br/>
Our servers are located in India. If you are accessing our Services from outside, please be aware that your information is transferred to, stored, and processed by us in our facilities in India.
<br/><br/>
If you are a resident in the European Economic Area (EEA) or United Kingdom (UK), then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this privacy notice and applicable law.
</p>, <p>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.
<br/><br/>
We will only keep your information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than 1 year.
<br/><br/>
When we have no ongoing legitimate business need to process your information, we will either delete or anonymize such information or if this is not possible (for example, because your information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
<br/><br/>
Please remember that we will not delete your data from our end till you have an ongoing business or relation with us.
</p>, <p>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
</p>, <p>Withdrawing your consent, If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section <i>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</i> below.
<br/><br/>
However, please note that this will not affect the lawfulness of the processing before its withdrawal, nor when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.<br/><br/>
<h4>Account Information</h4>

If you would at any time like to review or change the information in your account or terminate your account, you can:
<ol style={{textAlign:"left"}}><li>Log in to your account settings and update your user account.</li>
<li>Contact us using the contact information provided.</li></ol>
Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>, <p>
Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
</p>, <p>We may update this privacy policy from time to time. The updated version will be indicated by an <i>Last Updated on</i> date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>, <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <b style={{textAlign:"left"}}><br/> ABC Pvt. Ltd. [<a href="https://abc.com">abc.com</a>]<br/> Address, Baner<br/> Pune, Maharashtra 411022<br/> India<br/> Phone: (+91)1111111111<br/> <a href="mailto:ohsoproat@gmail.com">ohsoproat@gmail.com</a> </b> </p>, <p>Based on the applicable laws of India, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please login and update your information or contact use at <b><a href="mailto:queries@abc.com">queries@abc.com</a></b></p>];

    return <div id='terms'>
        <h2 style={{textAlign:"center"}}>Privacy Policy</h2>
        <p style={{textAlign:"right"}}>Last updated on June 25, 2022</p>
        <h4>Summary of the Policy</h4>
        <p>This Privacy Policy is between you whether personally or on behalf of an entity(hereinafter <b>you</b>) and ABC Pvt. Ltd (hereinafter <b>Company, we, us, or our</b>), describes how and why we might collect, store, use, and/or share (hereinafter <b>process</b>) your information when you use our services (hereinafter <b>Services</b>), such as when you: <ul><li>Visit our website at <b><a href="https://abc.com">https://abc.com</a></b>, or any website of ours that links to this privacy notice</li>
<li>Download and use our mobile application (ABC ), or any other application of ours that links to this privacy notice</li>
<li>Engage with us in other related ways, including any sales, marketing, or events</li></ul><br/><br/>
Please Check our Terms <b><Link to="tos" onClick={()=>window.scrollTo({top: 0, behavior: "smooth"})}>here</Link></b>
<br/><br/>
Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <b><a href="mailto:queries@abc.com">queries@abc.com</a></b>.
        <br/><br/>
        We are committed to securing your data and keeping it confidential. We have done all in our power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies and software, which help us safeguard all the information you store and trust with us<br/><br/>
This Summary provides key points from our Privacy Policy, but you can find out more details about any of these topics by clicking the link following each key point by using our table of contents below.
<br/><br/>
What personal information do we process? When you visit, use, or navigate our Services, We may process information depending on how you interact with the Software and the Services, the choices you make, and the products and features you use. We use this for the improvement of our Services.
<br/><br/>
Do we process any sensitive personal information? <b>We never process sensitive personal information.</b>
<br/><br/>
Do we receive any information from third parties? <b>No, We never receive information from public databases, marketing partners, social media platforms, and other outside sources.</b>
<br/><br/>
How do we process your information? <b>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.</b>
<br/><br/>
In what situations and with which parties do we share personal information? <b>We may share information in specific situations for legal purposes, We will notify you before we share any such information with outsiders.</b>
<br/><br/>
What are your rights? <b>For now, We operate only in India and expect you to reside here, by the applicable privacy law you have certain rights regarding your personal information.</b>
<br/><br/>
How do you exercise your rights? <b>The easiest way to exercise your rights is by filling out by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</b>
<br/><br/>
</p>
        <h4>Table of Contents :-</h4>
        <ol style={{color:"#1972d6"}}>
            {contents.map(item => <li style={{cursor:"pointer"}} onClick={()=>window.scrollTo({top: document.getElementById(item).getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth"})}>{item}</li>)}
        </ol>
        <br/><br/><br/><br/>
        {contents.map((item,idx) => <div id={item} style={{textAlign:"center",margin:"100px 150px 0"}}><h3>{item}</h3>{details[idx]}</div>)}
    </div>
}
