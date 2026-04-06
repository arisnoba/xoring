import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
	title: 'Privacy Policy | XO RING',
};

export default function PrivacyPage() {
	return (
		<main id="main-content" className="min-h-screen bg-black text-white relative" data-header-theme="dark">
			<Header />

			<div className="mx-auto max-w-4xl px-4 py-32 pt-40 pb-32 font-sans">
				<div className="mb-16">
					<h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">Privacy Policy</h1>
					<p className="text-white/50 text-sm font-medium tracking-wide">Last Updated: March 12, 2026</p>
				</div>

				<div className="prose prose-invert max-w-none text-white/80 leading-7 space-y-8">
					<section className="space-y-4">
						<p>
							This Privacy Policy (“Policy”) applies to the XO RING service (the “Platform”), including the XO RING app, website, software, smart ring and other connected device features, and
							other related services linked to this Policy.
						</p>
						<p>
							The Platform is provided and operated by DEEPCON Inc. (registered address: 1F, 15, Gangnam-daero 89-gil, Seocho-gu, Seoul, 06536, Republic of Korea) (“XO RING,” “we,” “us,” or the
							“Company”).
						</p>
						<p>
							This Policy explains how we collect, use, share, retain, and protect the personal information of users and other individuals in connection with the Platform. If you do not agree
							to this Policy, you must not use the Platform.
						</p>
					</section>

					<section className="space-y-6">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-6">Information We Collect</h2>
						<p>We may collect the following information about you.</p>

						<div className="space-y-6 pl-4">
							<div>
								<h3 className="text-xl font-medium text-white mb-3">1) Information You Provide Directly</h3>
								<div className="space-y-4">
									<div>
										<p className="font-semibold text-white mb-2">Account and Profile Information</p>
										<p className="mb-2">When you create an account or register for the Platform, we may collect the following information:</p>
										<ul className="list-disc pl-6 space-y-1 text-white/70">
											<li>Username</li>
											<li>Password</li>
											<li>Date of birth</li>
											<li>Email address</li>
											<li>Profile photo</li>
											<li>Other information you directly enter into or make available on your profile</li>
										</ul>
									</div>
									<div>
										<p className="font-semibold text-white mb-2">Customer Support and Inquiry Information</p>
										<p>If you contact us for customer support, inquiries, reports, complaints, or feedback, we may collect the contact information and related content you provide.</p>
									</div>
									<div>
										<p className="font-semibold text-white mb-2">Survey and Event Participation Information</p>
										<p>
											If you participate in surveys, promotions, marketing campaigns, challenges, events, or contests operated or sponsored by us, we may collect the related information you
											provide.
										</p>
									</div>
									<div>
										<p className="font-semibold text-white mb-2">Identity or Age Verification Information</p>
										<p>
											If you use certain functions related to AIOS tokens or other rewards, request transfers to an external wallet, or where verification is required by law or for fraud
											prevention purposes, we may request documents or information to verify your identity or age.
										</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-medium text-white mb-3 pt-6 border-t border-white/10">2) Device, Health, and Activity-Related Information</h3>
								<p className="mb-4">The Platform may connect with external devices such as smart rings, and we may collect the following health- and activity-related information.</p>

								<div className="space-y-4">
									<div>
										<p className="font-semibold text-white mb-2">Health and Activity Data</p>
										<ul className="list-disc pl-6 space-y-1 text-white/70">
											<li>Step count</li>
											<li>Travel distance</li>
											<li>Calories burned</li>
											<li>Heart rate (BPM)</li>
											<li>Blood oxygen saturation (SpO2)</li>
											<li>Sleep information</li>
											<li>Exercise duration and frequency</li>
											<li>Activity level</li>
											<li>Information about selected exercise types (e.g., running, cycling, walking, hiking, swimming, fitness, golf, kayaking, weight training, rowing, skiing, etc.)</li>
										</ul>
									</div>
									<div>
										<p className="font-semibold text-white mb-2">Challenge and Badge Information</p>
										<ul className="list-disc pl-6 space-y-1 text-white/70">
											<li>Whether you participated in challenges</li>
											<li>Challenge completion records</li>
											<li>Badge acquisition history</li>
											<li>Activity history and achievement display information</li>
										</ul>
									</div>
									<div>
										<p className="font-semibold text-white mb-2">Device Connection Information</p>
										<ul className="list-disc pl-6 space-y-1 text-white/70">
											<li>Whether a smart ring or connected device is linked</li>
											<li>Synchronization time and battery status</li>
											<li>Device identifier information</li>
											<li>App version and operating system information</li>
											<li>Error logs and synchronization records</li>
										</ul>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-medium text-white mb-3 pt-6 border-t border-white/10">3) Information Collected Automatically</h3>
								<div className="space-y-4">
									<div>
										<p className="font-semibold text-white mb-2">Usage Information</p>
										<p className="mb-2">We may automatically collect information about your use of the Platform, including:</p>
										<ul className="list-disc pl-6 space-y-1 text-white/70">
											<li>Date and time of app access and use</li>
											<li>Feature usage history</li>
											<li>Page or screen navigation history</li>
											<li>Search history</li>
											<li>Settings change history</li>
											<li>Challenge participation and completion status</li>
											<li>Reward accrual and usage history</li>
											<li>Service error history</li>
										</ul>
									</div>
									<div>
										<p className="font-semibold text-white mb-2">Technical Information</p>
										<p className="mb-2">We may collect information about the device and environment you use to access the Platform, including:</p>
										<ul className="list-disc pl-6 space-y-1 text-white/70">
											<li>IP address and user agent</li>
											<li>Mobile carrier and time zone setting</li>
											<li>Device model and identifier</li>
											<li>Operating system and version</li>
											<li>Network type and app version</li>
											<li>Screen resolution and battery status</li>
											<li>Bluetooth connection status</li>
										</ul>
									</div>
									<div>
										<p className="font-semibold text-white mb-2">Location Information</p>
										<p>
											We may collect approximate location information based on your SIM card and/or IP address. If you provide your consent, we may also collect precise location
											information, such as GPS data. Precise location information may be used to provide features such as exercise tracking, travel distance calculation, route display, and
											challenge verification.
										</p>
									</div>
									<div>
										<p className="font-semibold text-white mb-2">Cookies and Similar Technologies</p>
										<p>
											We and our service providers or partners may use cookies, SDKs, web beacons, and other similar technologies to analyze how you use the Platform, improve service
											performance, and support customized features and security.
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="space-y-6">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-6">Behavioral Data and AIOS Reward-Related Information</h2>

						<div className="space-y-6 pl-4">
							<div>
								<h3 className="text-xl font-medium text-white mb-3">1) Categories of Data Collected</h3>
								<p className="mb-2">We may collect the following behavioral data related to your activities on the Platform:</p>
								<ul className="list-disc pl-6 space-y-1 text-white/70">
									<li>Login frequency and access time</li>
									<li>Exercise participation frequency and duration</li>
									<li>Changes in activity level</li>
									<li>Challenge participation and completion status</li>
									<li>Badge acquisition history</li>
									<li>Usage patterns necessary for reward calculation</li>
									<li>System logs and device connection information used to detect abnormal usage</li>
								</ul>
							</div>

							<div>
								<h3 className="text-xl font-medium text-white mb-3 pt-6 border-t border-white/10">2) Purposes of Collection</h3>
								<p className="mb-2">Collected behavioral data may be used for the following purposes:</p>
								<ul className="list-disc pl-6 space-y-1 text-white/70">
									<li>Calculating user activity and contribution</li>
									<li>Calculating and crediting AIOS tokens or other digital rewards</li>
									<li>Providing personalized statistics and feedback</li>
									<li>Operating challenges and verifying results</li>
									<li>Detecting and preventing abuse (e.g., fake accounts, device manipulation, sensor tampering, abnormal activity patterns)</li>
									<li>Improving service operations and researching new features</li>
								</ul>
							</div>

							<div>
								<h3 className="text-xl font-medium text-white mb-3 pt-6 border-t border-white/10">3) AIOS Rewards</h3>
								<p className="mb-3">We may calculate and credit AIOS tokens or other digital rewards based on the behavioral data described above.</p>
								<p className="mb-3">
									The specific accrual method, calculation standards, distribution cycle, scope of use, and expiration conditions for rewards are governed by the separate AIOS Token Operation
									Policy or other related operational policies.
								</p>
								<div className="bg-white/5 border border-white/10 rounded-lg p-4 my-4">
									<p className="text-sm font-medium text-white/90">
										<strong>Important:</strong> You understand and agree that AIOS tokens or other rewards are not equivalent to cash or legal tender and must not be interpreted as
										guaranteed investment returns or a cash conversion instrument.
									</p>
								</div>
								<p>We may recover rewards obtained through improper conduct or restrict the relevant account.</p>
							</div>

							<div>
								<h3 className="text-xl font-medium text-white mb-3 pt-6 border-t border-white/10">4) Data Processing Methods</h3>
								<p className="mb-3">
									Behavioral data we collect may be pseudonymized or anonymized so that individuals cannot be directly identified. Some data may be aggregated and used for statistical and
									research purposes.
								</p>
								<p>
									You may manage your consent regarding the collection and use of behavioral data through platform settings or related procedures, and withdrawal of consent may limit certain
									functions or reward accrual.
								</p>
							</div>
						</div>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-4">Information Collected from Other Sources</h2>
						<p className="mb-2">We may receive information from the following sources:</p>
						<ul className="list-disc pl-6 space-y-2 text-white/70">
							<li>
								If you choose to sign up or log in using Google, Apple, or another third-party login service, we may receive public profile information, identifier information, and
								authentication-related information from that service.
							</li>
							<li>
								We may receive your device identifier, advertising identifier, hashed contact information, and campaign response information from advertising, measurement, or analytics
								partners.
							</li>
							<li>If a report, complaint, inquiry, or legal request is made in relation to your account, we may receive information about you from third parties.</li>
							<li>We may collect information about you from publicly available sources.</li>
						</ul>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-4">How We Use Your Information</h2>
						<p className="mb-2">We use the information we collect for the following purposes:</p>
						<ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-6 text-white/70">
							<li>Creating accounts, logging users in, and identifying users</li>
							<li>Connecting and synchronizing devices such as smart rings</li>
							<li>Providing exercise records, health data, and statistics</li>
							<li>Displaying measurement information (steps, distance, calories, etc.)</li>
							<li>Operating challenges and awarding badges</li>
							<li>Calculating and providing AIOS tokens or other rewards</li>
							<li>Providing personalized feedback, statistics, and service experiences</li>
							<li>Responding to customer support requests, inquiries, and complaints</li>
							<li>Detecting and responding to abuse, abnormal activity, fraud, and security issues</li>
							<li>Improving services, enhancing quality, and developing new features</li>
							<li>Fulfilling legal obligations and handling disputes</li>
							<li>Providing location-based features with your consent</li>
							<li>Sending marketing and promotional information with your consent</li>
							<li>Improving machine learning models and algorithms</li>
						</ul>
					</section>

					<section className="space-y-6">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-6">How We Share Your Information</h2>
						<p className="mb-4">We may share your information with third parties in the following cases:</p>

						<div className="space-y-6 pl-4">
							<div>
								<h3 className="text-lg font-medium text-white mb-2">1) Service Providers</h3>
								<p>
									We may share information with service providers that support our business operations, including cloud service providers, data storage and analytics providers, customer
									support tool providers, security and monitoring service providers, and identity verification providers.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-medium text-white mb-2">2) Analytics and Measurement Partners</h3>
								<p>We may share information with analytics and measurement partners for service improvement, usability analysis, performance measurement, and error analysis.</p>
							</div>
							<div>
								<h3 className="text-lg font-medium text-white mb-2">3) Reward and Verification Partners</h3>
								<p>
									Where necessary for AIOS tokens, reward distribution, external wallet transfers, identity verification, age verification, or fraud prevention, we may share your information
									with partners performing such functions.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-medium text-white mb-2">4) Legal Reasons</h3>
								<p className="mb-2">We may share your information with law enforcement agencies, regulatory authorities, public authorities, or other third parties where necessary for:</p>
								<ul className="list-disc pl-6 space-y-1 text-white/70">
									<li>Compliance with legal obligations, procedures, or requests</li>
									<li>Enforcement of these Terms of Service and operational policies</li>
									<li>Detection, prevention, and response to fraud, security issues, and technical issues</li>
									<li>Protection of the rights, property, and safety of the Company, users, third parties, or the public</li>
								</ul>
							</div>
							<div>
								<h3 className="text-lg font-medium text-white mb-2">5) Business Transfer, Merger, etc.</h3>
								<p>
									If we sell, acquire, merge, divide, or otherwise engage in a corporate transaction involving our business or assets, your information may be transferred as part of that
									transaction.
								</p>
							</div>
						</div>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-4">Your Rights and Choices</h2>
						<p className="mb-2">Subject to applicable law, you may have the following rights with respect to your personal information:</p>
						<ul className="list-disc pl-6 space-y-1 text-white/70 mb-4">
							<li>Request access to and inspection of your personal information</li>
							<li>Request correction of inaccurate information</li>
							<li>Request deletion</li>
							<li>Request suspension of processing</li>
							<li>Withdraw consent</li>
							<li>Request an explanation regarding the processing of personal information</li>
							<li>Lodge a complaint with the relevant authority</li>
						</ul>
						<p className="mt-4">You may access and edit most of your profile information by logging into the Platform.</p>
						<p>You may also manage the visibility of certain information, notification settings, location permissions, cookies, and other permission settings through your account settings.</p>
						<p>If you wish to restrict or reject the use of cookies, you may do so through your browser or device settings. However, some features may not function properly as a result.</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-4">Security of Your Information</h2>
						<p>We implement reasonable technical, administrative, and physical safeguards to protect your personal information.</p>
						<p>
							However, transmission of information over the internet cannot be guaranteed to be completely secure by its nature, and therefore we cannot fully guarantee the security of
							information transmitted through the Platform.
						</p>
						<p>
							We strive to maintain and improve the level of personal information protection through appropriate measures such as access restrictions, encryption, access control, and internal
							management plans.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-4">Retention of Your Information</h2>
						<p>We retain personal information for as long as necessary to provide the Platform services to you and for the purposes described in this Policy.</p>
						<p>
							We may also retain information where necessary to comply with contractual or legal obligations, resolve disputes, respond to abuse, ensure security, or establish, exercise, or
							defend legal claims.
						</p>
						<p>
							Retention periods vary depending on the type of information, the purpose of collection, and legal requirements. For example, your account information may be retained for as long
							as you maintain your account, and where there has been a violation of our Terms or policies, some information may be retained longer for investigation and response purposes.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-4">Information Relating to Children and Adolescents</h2>
						<p>XO RING is not intended for children under the age of 14 as a general rule. A higher minimum age may apply depending on the laws of the relevant jurisdiction.</p>
						<p>If we determine that a user below the applicable minimum age is using the Platform, we may restrict or delete the account and process related information accordingly.</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-4">Updates to This Privacy Policy</h2>
						<p>
							We may update this Policy from time to time as necessary. If we update this Policy, we will revise the “Last Updated” date above and notify you by posting the updated Policy or by
							any other means required by applicable law.
						</p>
						<p>
							If you continue to use the Platform after the effective date of the updated Policy, you will be deemed to have accepted the updated Policy. If you do not agree to the updated
							Policy, you must stop using the Platform.
						</p>
					</section>

					<section className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 mt-12">
						<h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
						<p>If you have any questions, comments, complaints, or requests regarding this Privacy Policy, please contact us at:</p>
						<address className="not-italic text-white/80 space-y-2 mt-4 pl-4 border-l-2 border-primary/50">
							<p className="font-semibold text-white">DEEPCON Inc.</p>
							<p>1F, 15, Gangnam-daero 89-gil, Seocho-gu, Seoul, 06536, Republic of Korea</p>
							<div className="pt-2">
								<p className="text-sm text-white/50 mb-1">Personal Information Protection Officer</p>
								<p>
									Name: <span className="text-white">Park Jungsoo</span>
								</p>
								<p>
									Email:{' '}
									<a href="mailto:max@thedeepcon.com" className=" hover:underline text-amber-100">
										max@thedeepcon.com
									</a>
								</p>
							</div>
							<div className="pt-2">
								<p className="text-sm text-white/50 mb-1">General Inquiries</p>
								<p>
									Email:{' '}
									<a href="mailto:info@thedeepcon.com" className=" hover:underline text-amber-100">
										info@thedeepcon.com
									</a>
								</p>
							</div>
						</address>
						<p className="text-sm text-white/60 mt-4 pt-4 border-t border-white/10">
							We will endeavor to handle your request as promptly as possible. This does not limit your right to lodge a complaint with the relevant supervisory authority under applicable law.
						</p>
					</section>

					<section className="space-y-6 mt-16">
						<h2 className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-6">Supplementary Terms – Republic of Korea</h2>
						<p className="mb-4">
							If you use the Service in the Republic of Korea, the following additional provisions shall apply and shall prevail over the main body of this Policy to the extent of any conflict.
						</p>

						<div className="space-y-6 pl-4">
							<div>
								<h3 className="text-lg font-medium text-white mb-2">Retention of Information</h3>
								<p className="mb-2">
									We will destroy personal information without delay once the purpose of collection and use has been achieved or the retention period has expired. However, where retention is
									required by applicable law, we may retain such information for the relevant statutory period. Examples include:
								</p>
								<div className="space-y-4 mt-4 bg-white/5 p-4 rounded-xl">
									<div>
										<p className="font-medium text-white text-sm mb-2">Act on the Consumer Protection in Electronic Commerce, etc.</p>
										<ul className="list-disc pl-6 space-y-1 text-sm text-white/70">
											<li>Records regarding contracts or withdrawal of offers: 5 years</li>
											<li>Records regarding payment and supply of goods or services: 5 years</li>
											<li>Records regarding consumer complaints or dispute resolution: 3 years</li>
											<li>Records regarding advertising and labeling: 6 months</li>
										</ul>
									</div>
									<div className="pt-2 border-t border-white/10">
										<p className="font-medium text-white text-sm mb-2">Protection of Communications Secrets Act</p>
										<ul className="list-disc pl-6 space-y-1 text-sm text-white/70">
											<li>Website visit records: 3 months</li>
										</ul>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-medium text-white mb-2">Destruction of Personal Information</h3>
								<p>
									Where personal information becomes unnecessary due to the expiration of the retention period or achievement of the processing purpose, we will destroy such information
									without delay in a manner that prevents restoration or reproduction.
								</p>
							</div>

							<div>
								<h3 className="text-lg font-medium text-white mb-2">Rights of Data Subjects</h3>
								<p>
									You may request access to, correction of, deletion of, or suspension of processing of your personal information held by us. You may exercise these rights by contacting us.
								</p>
							</div>

							<div>
								<h3 className="text-lg font-medium text-white mb-2">Information Security</h3>
								<p>
									We implement technical, administrative, and physical safeguards to prevent the loss, theft, leakage, forgery, alteration, or damage of personal information and to protect
									users’ personal information.
								</p>
							</div>

							<div>
								<h3 className="text-lg font-medium text-white mb-2">Information Relating to Children</h3>
								<p>XO RING is not intended for children under the age of 14.</p>
							</div>

							<div>
								<h3 className="text-lg font-medium text-white mb-2">Outsourcing of Processing and/or Cross-Border Transfer of Personal Information</h3>
								<p className="mb-3">
									In order to provide services to you, we may directly collect and process your personal information overseas or outsource processing to affiliates, cloud service providers,
									IT service providers, analytics service providers, and others. Some of these entities may be located outside Korea.
								</p>
								<p className="mb-3">
									We take reasonable contractual and administrative measures to ensure that entrusted processors implement appropriate safeguards in accordance with applicable law.
								</p>
								<p>
									You may contact us to request an explanation regarding the overseas transfer of personal information or, to the extent permitted by applicable law, express your refusal.
									However, in such cases, your use of certain services may be restricted.
								</p>
							</div>

							<div>
								<h3 className="text-lg font-medium text-white mb-2">Organizations for Privacy Infringement Reports and Consultation</h3>
								<p className="mb-3">If you need to report or consult regarding privacy infringement, you may contact the following organizations:</p>
								<ul className="list-disc pl-6 space-y-2 text-sm text-white/70">
									<li>
										Personal Information Dispute Mediation Committee:{' '}
										<a href="https://www.kopico.go.kr" target="_blank" rel="noreferrer" className="hover:underline text-amber-100">
											www.kopico.go.kr
										</a>{' '}
										/ 1833-6972
									</li>
									<li>
										Personal Information Infringement Report Center:{' '}
										<a href="https://privacy.kisa.or.kr" target="_blank" rel="noreferrer" className="hover:underline text-amber-100">
											privacy.kisa.or.kr
										</a>{' '}
										/ 118
									</li>
									<li>
										Supreme Prosecutors’ Office:{' '}
										<a href="https://www.spo.go.kr" target="_blank" rel="noreferrer" className="hover:underline text-amber-100">
											www.spo.go.kr
										</a>{' '}
										/ 1301
									</li>
									<li>
										Korean National Police Agency:{' '}
										<a href="https://ecrm.police.go.kr" target="_blank" rel="noreferrer" className="hover:underline text-amber-100">
											ecrm.police.go.kr
										</a>{' '}
										/ 182
									</li>
								</ul>
							</div>
						</div>
					</section>
				</div>
			</div>

			<Footer />
		</main>
	);
}
