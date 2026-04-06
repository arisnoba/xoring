import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
	title: 'Terms of Service | XO RING',
};

export default function TermsPage() {
	return (
		<main id="main-content" className="min-h-screen bg-black text-white relative" data-header-theme="dark">
			<Header />

			<div className="mx-auto max-w-4xl px-4 py-32 pt-40 pb-32 font-sans">
				<div className="mb-16">
					<h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">Terms of Service</h1>
					<div className="flex gap-4 text-white/50 text-sm font-medium tracking-wide">
						<p>Last Updated: March 12, 2026</p>
						<span aria-hidden="true">·</span>
						<p>Effective Date: March 12, 2026</p>
					</div>
				</div>

				<div className="prose prose-invert max-w-none text-white/80 leading-7 space-y-8">
					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mb-4">Purpose of These Terms</h2>
						<p>These Terms of Service (the “Terms”) set forth the rights, obligations, and responsibilities between DEEPCON Co., Ltd. (hereinafter, “DEEPCON” or the “Company”) and users in connection with the use of XO RING-related websites, applications, device connectivity features, exercise and health tracking services, reward services, and other ancillary services (collectively, the “Service”).</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Effectiveness of These Terms</h2>
						<ul className="list-disc pl-6 space-y-2 text-white/70">
							<li>These Terms become effective when the user agrees to these Terms and applies for or actually uses the Service provided by the Company.</li>
							<li>By using the Service, the user shall be deemed to have agreed to these Terms, the Privacy Policy, Community Operating Policy, and any other policies separately established by the Company, including policies related to AIOS tokens or rewards. Each such policy forms an integral part of these Terms.</li>
							<li>The Service may be provided in the Republic of Korea and other countries or regions. Additional terms may apply depending on the laws and regulations of each applicable jurisdiction. If these Terms conflict with any additional terms applicable in a particular jurisdiction, such additional terms shall prevail.</li>
						</ul>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Amendments to These Terms</h2>
						<ul className="list-disc pl-6 space-y-2 text-white/70">
							<li>The Company may amend these Terms if necessary due to changes to the Service, the addition or removal of features, changes in applicable laws or regulations, changes in device connectivity methods, or adjustments to reward policies.</li>
							<li>If the Company amends these Terms, it shall provide prior notice of the changes, effective date, and reasons for such changes through notices within the Service or by other reasonable means. If the changes are materially adverse to users or otherwise significant, the Company shall provide separate notice within a reasonable period prior to the effective date.</li>
							<li>If the user continues to use the Service after the effective date of the amended Terms, the user shall be deemed to have agreed to the amended Terms.</li>
						</ul>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">User Account</h2>
						<p className="mb-2">A user may be required to create an account in order to use all or part of the Service. The user must provide accurate and up-to-date information and must promptly update such information if any changes occur.</p>
						<p className="mb-2">The user is responsible for securely managing their account credentials and password and must not share them with any third party. The user is responsible for activities conducted through their account, except where such activities result from the Company’s willful misconduct or gross negligence.</p>
						<div className="bg-white/5 border border-white/10 rounded-lg p-4 my-4">
							<p className="font-medium text-white mb-2">The Company may restrict, suspend, or terminate a user’s account if it reasonably determines that any of the following applies:</p>
							<ul className="list-disc pl-6 space-y-1 text-white/70 text-sm">
								<li>Violation of these Terms or related policies</li>
								<li>Attempt to manipulate activity data or obtain rewards by improper means</li>
								<li>Abnormal use of devices or accounts</li>
								<li>Infringement of another person’s rights or violation of applicable laws or regulations</li>
								<li>Conduct that undermines the stability or reliability of the Service</li>
							</ul>
						</div>
						<p>If the user requests account deletion, the Company shall process the request in accordance with applicable laws and internal policies. After account deletion, some or all activity records, reward history, badges, and settings may not be recoverable.</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Scope of the Service</h2>
						<p className="mb-2">The Company may provide users with the following services:</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-6 text-white/70">
							<ul className="list-disc pl-6 space-y-2 md:col-span-2">
								<li>Registration and connection of compatible devices such as smart rings</li>
								<li>Selection of exercise types and exercise record tracking features</li>
								<li>Display of health and activity data such as step count, travel distance, calories burned, heart rate (BPM), blood oxygen saturation (SpO2), and sleep</li>
								<li>Exercise tracking based on activity types such as running, cycling, walking, hiking, swimming, fitness, golf, kayaking, weight training, rowing, and skiing</li>
								<li>Challenge participation, badge acquisition, and activity history review features</li>
								<li>AIOS tokens or other digital rewards based on activity level or contribution</li>
								<li>Other features additionally provided by the Company</li>
							</ul>
						</div>
						<p className="mt-4">The Company may change, suspend, or limit part of the Service as necessary for operational or technical reasons.</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Device Connectivity and Measurement Data</h2>
						<p className="mb-2">The Service may be used in connection with external devices such as smart rings. The user understands and agrees that certain features or measurement values may vary depending on the device’s connection status, battery condition, sensor accuracy, operating system environment, and network condition.</p>
						<p className="mb-2">The user understands that the activity and health-related data displayed through the Service is provided as general reference information for informational and personal record-management purposes.</p>
						<div className="bg-white/5 border border-white/10 rounded-lg p-5 my-6 space-y-4">
							<p className="font-medium text-white">The Company expressly notifies users that the Service does not replace medical practice, diagnosis, treatment, emergency response, or professional medical advice.</p>
							<p className="text-white/80">Accordingly, the following shall apply:</p>
							<ul className="list-disc pl-6 space-y-1 text-white/70 text-sm">
								<li>Measurement values may differ from the user’s actual physical condition.</li>
								<li>Heart rate, sleep, blood oxygen saturation, and similar data are provided for reference only and must not be used as the sole basis for medical judgment.</li>
								<li>If the user suspects any health abnormality, the user should consult a physician or qualified medical institution.</li>
								<li>Information provided by the Service and connected devices is intended solely as reference information for general health and activity management and shall not be interpreted as a medical device or medical service.</li>
							</ul>
						</div>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Use of the Service and Prohibited Conduct</h2>
						<p className="mb-4">The user must use the Service in compliance with these Terms, applicable laws, and the Company’s policies.</p>
						
						<div className="space-y-2">
							<p className="font-medium text-white">The user must not engage in any of the following acts:</p>
							<ul className="list-disc pl-6 space-y-2 text-white/70">
								<li>Creating an account using false information or using another person’s information without authorization</li>
								<li>Creating multiple accounts by a single user in order to obtain unfair rewards</li>
								<li>Manipulating activity data or fraudulently obtaining rewards through automation programs, macros, emulators, sensor tampering, location spoofing, abnormal device connectivity, or similar means</li>
								<li>Intentionally causing or exploiting malfunctions of a smart ring or connected device</li>
								<li>Reverse engineering, disassembling, decompiling, or circumventing security measures of the Service or system</li>
								<li>Interfering with the stable operation of the Service</li>
								<li>Accessing or attempting to access another person’s account without authorization</li>
								<li>Using the Service for commercial or profit-making purposes without the Company’s approval</li>
								<li>Violating applicable laws, public order, morals, or the rights of third parties</li>
								<li>Any other conduct that the Company reasonably determines to be inappropriate for the Service</li>
							</ul>
						</div>
						<p className="mt-4">If such conduct is confirmed or reasonably suspected, the Company may take measures including investigation, record retention, withholding rewards, restricting the account, restricting challenge participation, or invalidating tokens.</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Collection and Use of Health and Activity Data</h2>
						
						<div className="grid md:grid-cols-2 gap-8 mt-6">
							<div>
								<p className="font-medium text-white mb-2">The Company may collect, analyze, or process the following data when the user uses the Service:</p>
								<ul className="list-disc pl-6 space-y-1 text-white/70 text-sm">
									<li>Step count, travel distance, and calories burned</li>
									<li>Heart rate (BPM) and blood oxygen saturation (SpO2)</li>
									<li>Sleep-related information</li>
									<li>Exercise type, time, frequency, and activity level</li>
									<li>Device connection and synchronization information</li>
									<li>Challenge participation and badge acquisition records</li>
									<li>Service logs, access records, and error records</li>
								</ul>
							</div>
							<div>
								<p className="font-medium text-white mb-2">The Company may use the above data for the following purposes:</p>
								<ul className="list-disc pl-6 space-y-1 text-white/70 text-sm">
									<li>Providing exercise records and improving convenience in health management</li>
									<li>Providing personalized statistics, feedback, and activity analysis</li>
									<li>Operating challenges and awarding badges</li>
									<li>Detecting abnormal usage and preventing fraudulent rewards</li>
									<li>Improving service quality and ensuring system stability</li>
									<li>Calculating AIOS tokens or other rewards</li>
									<li>Fulfilling obligations under applicable laws</li>
								</ul>
							</div>
						</div>
						<p className="mt-4 text-sm text-white/60">Detailed matters concerning the collection items, processing methods, retention period, and third-party provision of health and activity data shall be governed by the Privacy Policy.</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">AIOS Tokens and Rewards</h2>
						<p className="mb-2">The Company may provide benefits in the form of digital rewards or point-based rewards based on the user’s activity level, participation, or other criteria determined by the Company, and the specific name, distribution method and operational standards are governed by separate policies.</p>
						
						<div className="space-y-4">
							<p className="font-medium text-white">The following shall apply:</p>
							<ul className="list-disc pl-6 space-y-2 text-white/70">
								<li>AIOS tokens or rewards shall be operated in accordance with separate policies established by the Company.</li>
								<li>Whether rewards are granted, the timing of grant, the amount granted, calculation methods, and participation conditions may be changed in accordance with the Company’s operating policies.</li>
								<li>Rewards obtained through improper means may be canceled, recovered, or invalidated.</li>
								<li>Rewards may be suspended, restricted, or changed due to service operations, legal requirements, policy updates, or technical reasons.</li>
							</ul>
							
							<div className="bg-white/5 border border-white/10 rounded-lg p-5 mt-4">
								<p className="font-medium text-white mb-2">Notice</p>
								<p className="text-white/80 text-sm mb-4">Unless otherwise expressly stated, rewards do not have the same value as legal tender and must not be interpreted as guaranteed investment returns or means of cash conversion.</p>
								
								<p className="font-medium text-white text-sm mb-2 mt-4">In particular, the following acts are prohibited:</p>
								<ul className="list-disc pl-6 space-y-1 text-white/70 text-sm">
									<li>Generating false activity data</li>
									<li>Manipulating devices or generating fictitious activity</li>
									<li>Receiving rewards through multiple accounts or organized schemes</li>
									<li>Acquiring tokens in a manner contrary to the purpose of the Service</li>
									<li>Using transfer, trade, or exchange methods not permitted by the Company</li>
								</ul>
							</div>
						</div>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Challenges and Badges</h2>
						<p>The Company may provide users with opportunities to participate in challenges and obtain badges. The types of challenges, participation requirements, achievement criteria, duration, and whether rewards are provided may vary according to the Company’s policies.</p>
						<p>Badges are digital indicators intended to visually display a user’s activity history and, unless otherwise specified, do not carry property value or legal rights.</p>
						<div className="mt-4">
							<p className="font-medium text-white mb-2">The Company may cancel or restrict challenge achievements or badge grants in the following cases:</p>
							<ul className="list-disc pl-6 space-y-1 text-white/70">
								<li>Abnormal data is detected</li>
								<li>Violation of operating policies is confirmed</li>
								<li>Improper granting occurred due to system error or device error</li>
							</ul>
						</div>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Intellectual Property Rights</h2>
						<p>All intellectual property rights in and to the Service, applications, interfaces, designs, logos, trademarks, software, images, texts, graphics, data structures, and other related content belong to the Company or the legitimate rights holder.</p>
						<p>Except as permitted by these Terms or applicable law, the user may not reproduce, distribute, transmit, modify, create derivative works from, sell, license, or commercially exploit all or any part of the Service without the Company’s prior written consent.</p>
					</section>

					<section className="space-y-6">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Disclaimer and Limitation of Warranties</h2>
						<p className="mb-4">The Company makes reasonable efforts to provide the Service in a stable manner. However, due to device connection status, sensor characteristics, network conditions, operating system environments, and other technical circumstances, use of the Service may be limited or measurement values may contain errors.</p>
						
						<div className="grid md:grid-cols-2 gap-8">
							<div>
								<p className="font-medium text-white mb-2">Accordingly, the Company does not guarantee any of the following at all times:</p>
								<ul className="list-disc pl-6 space-y-2 text-white/70 text-sm">
									<li>That the Service will always be available without interruption</li>
									<li>That all measurement data will be completely accurate</li>
									<li>That any particular exercise result, health improvement, or reward outcome will be guaranteed</li>
									<li>That all errors or defects will be corrected immediately</li>
								</ul>
							</div>
							<div>
								<p className="font-medium text-white mb-2">While the Company shall exercise reasonable care in managing the Service, it shall not be liable for damages caused by the following:</p>
								<ul className="list-disc pl-6 space-y-2 text-white/70 text-sm">
									<li>The user’s device condition, sensor errors, or network instability</li>
									<li>Failure of third-party platforms or external devices</li>
									<li>The user’s careless use or incorrect health-related judgment</li>
									<li>Failure to apply free updates or failure to meet minimum system requirements</li>
									<li>Restrictions on the Service due to laws or regulations</li>
								</ul>
							</div>
						</div>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Limitation of Liability</h2>
						<p>To the extent permitted by applicable law, the Company shall not be liable for indirect damages, special damages, consequential damages, business losses, or loss of expected profits arising in connection with the use of the Service. However, this shall not apply to damages caused by the Company’s willful misconduct or gross negligence, which shall be governed by applicable law.</p>
						<p>Measurement data, health data, exercise records, challenge results, and reward details may vary or contain errors depending on system and device conditions, and the Company does not guarantee accuracy beyond a reasonable scope.</p>
					</section>

					<section className="space-y-6">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Account Restrictions and Service Limitations</h2>
						
						<div className="grid md:grid-cols-2 gap-8">
							<div>
								<p className="font-medium text-white mb-2">The Company may restrict the use of the Service upon prior notice, or where urgent, by notice after the fact, if any of the following applies:</p>
								<ul className="list-disc pl-6 space-y-1 text-white/70 text-sm">
									<li>Violation of these Terms or operating policies</li>
									<li>Suspicion or confirmation of improper use</li>
									<li>Possible violation of applicable laws</li>
									<li>Need to ensure system stability and security</li>
									<li>Need to protect the rights of third parties</li>
								</ul>
							</div>
							<div>
								<p className="font-medium text-white mb-2">Where necessary, the Company may take the following measures:</p>
								<ul className="list-disc pl-6 space-y-1 text-white/70 text-sm">
									<li>Temporary suspension of the account or deletion of the account</li>
									<li>Restriction on challenge participation or revocation of badges</li>
									<li>Withholding or cancellation of AIOS token rewards</li>
									<li>Restriction on device connectivity</li>
								</ul>
							</div>
						</div>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Age Restrictions</h2>
						<p>The Service is intended in principle for users aged 14 or older. If a higher minimum age is required under the laws of the applicable jurisdiction, such requirement shall prevail.</p>
						<p>If a minor uses the Service, consent from the minor’s legal representative may be required.</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Governing Law and Jurisdiction</h2>
						<p>These Terms shall be governed by the laws of the Republic of Korea.</p>
						<p>Any dispute arising out of or in connection with these Terms or the Service shall be subject to the exclusive jurisdiction of the court having jurisdiction over the location of the Company’s principal office as the court of first instance.</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4">Miscellaneous</h2>
						<ul className="list-disc pl-6 space-y-2 text-white/70">
							<li>If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.</li>
							<li>The Company’s failure to exercise any right under these Terms shall not be interpreted as a waiver of such right.</li>
							<li>Certain open-source software included in the Service may be subject to their respective license terms.</li>
						</ul>
					</section>
				</div>
			</div>
			
			<Footer />
		</main>
	);
}
