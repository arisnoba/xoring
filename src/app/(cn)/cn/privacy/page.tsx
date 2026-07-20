import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getMessages } from '@/lib/i18n';

const messages = getMessages('cn');

export const metadata: Metadata = {
	title: '隐私政策 | XO RING',
	description: 'XO RING 隐私政策中文页面',
	alternates: {
		canonical: '/cn/privacy/',
		languages: {
			en: '/privacy/',
			'zh-CN': '/cn/privacy/',
		},
	},
};

const headingClassName = 'text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-16 mb-6';
const subheadingClassName = 'text-xl font-medium text-white mb-3 pt-6 border-t border-white/10';
const listClassName = 'list-disc pl-6 space-y-2 text-white/70';

export default function ChinesePrivacyPage() {
	return (
		<main id="main-content" className="min-h-screen bg-black text-white relative" data-header-theme="dark">
			<Header locale="cn" copy={messages.header} />

			<div className="mx-auto max-w-4xl px-4 py-32 pt-40 pb-32 font-sans">
				<div className="mb-16">
					<h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">隐私政策</h1>
					<p className="text-white/50 text-sm font-medium tracking-wide">最后更新：2026 年 3 月 12 日</p>
				</div>

				<div className="prose prose-invert max-w-none text-white/80 leading-7 space-y-8">
					<section className="space-y-4">
						<p>本隐私政策（以下简称“本政策”）适用于 XO RING 服务（以下简称“平台”），包括 XO RING 应用程序、网站、软件、智能戒指及其他连接设备功能，以及链接至本政策的其他相关服务</p>
						<p>平台由 DEEPCON Inc. 提供并运营，注册地址为韩国首尔特别市瑞草区江南大路 89 街 15 号 1 层，邮编 06536（以下简称“XO RING”“我们”或“公司”）</p>
						<p>本政策说明我们如何收集、使用、共享、保存和保护用户及其他个人与平台相关的个人信息如果你不同意本政策，请勿使用平台</p>
					</section>

					<section className="space-y-6">
						<h2 className={headingClassName}>我们收集的信息</h2>
						<p>我们可能收集以下与你有关的信息</p>

						<div className="space-y-6 pl-4">
							<div>
								<h3 className="text-xl font-medium text-white mb-3">1）你直接提供的信息</h3>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold text-white/90 mb-2">账户与个人资料信息</h4>
										<p>当你创建账户或注册平台时，我们可能收集用户名、密码、出生日期、邮箱地址、头像，以及你直接填写或公开在个人资料中的其他信息</p>
									</div>
									<div>
										<h4 className="font-semibold text-white/90 mb-2">客户支持与咨询信息</h4>
										<p>当你联系我们寻求客户支持、提出咨询、举报、投诉或反馈时，我们可能收集你提供的联系方式及相关内容</p>
									</div>
									<div>
										<h4 className="font-semibold text-white/90 mb-2">问卷与活动参与信息</h4>
										<p>当你参与我们运营或赞助的问卷、促销、营销活动、挑战、活动或竞赛时，我们可能收集你提交的相关信息</p>
									</div>
									<div>
										<h4 className="font-semibold text-white/90 mb-2">身份或年龄验证信息</h4>
										<p>当你使用 AIOS 代币或其他奖励相关功能、申请转入外部钱包，或法律要求及防止欺诈需要验证时，我们可能要求提供用于确认身份或年龄的文件或信息</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className={subheadingClassName}>2）设备、健康与活动相关信息</h3>
								<h4 className="font-semibold text-white/90 mb-2">健康与活动数据</h4>
								<ul className={listClassName}>
									<li>步数、移动距离、消耗热量</li>
									<li>心率（BPM）、血氧饱和度（SpO2）及睡眠信息</li>
									<li>运动时长、运动频率与活动量</li>
									<li>所选运动类型，例如跑步、骑行、步行、徒步、游泳、健身、高尔夫、皮划艇、力量训练、划船及滑雪等</li>
								</ul>
								<h4 className="font-semibold text-white/90 mt-5 mb-2">挑战与徽章信息</h4>
								<ul className={listClassName}>
									<li>挑战参与情况及完成记录</li>
									<li>徽章获取历史</li>
									<li>活动历史及成就展示信息</li>
								</ul>
								<h4 className="font-semibold text-white/90 mt-5 mb-2">设备连接信息</h4>
								<ul className={listClassName}>
									<li>智能戒指或连接设备的绑定状态、同步时间与电池状态</li>
									<li>设备标识信息、应用版本及操作系统信息</li>
									<li>错误日志及同步记录</li>
								</ul>
							</div>

							<div>
								<h3 className={subheadingClassName}>3）自动收集的信息</h3>
								<h4 className="font-semibold text-white/90 mb-2">使用信息</h4>
								<p>我们可能自动收集应用访问和使用日期与时间、功能使用历史、页面或屏幕浏览记录、搜索历史、设置变更、挑战参与及完成状态、奖励累积与使用记录，以及服务错误记录</p>
								<h4 className="font-semibold text-white/90 mt-5 mb-2">技术信息</h4>
								<p>我们可能收集 IP 地址、用户代理、移动运营商、时区设置、设备型号及标识符、操作系统及版本、网络类型、应用版本、屏幕分辨率、电池状态和蓝牙连接状态</p>
								<h4 className="font-semibold text-white/90 mt-5 mb-2">位置信息</h4>
								<p>我们可能根据 SIM 卡及／或 IP 地址收集大致位置信息在取得你的同意后，我们也可能收集 GPS 等精确位置信息，用于运动记录、移动距离计算、路线展示及挑战验证等功能</p>
								<h4 className="font-semibold text-white/90 mt-5 mb-2">Cookie 与类似技术</h4>
								<p>我们及服务提供商或合作伙伴可能使用 Cookie、SDK、网络信标及其他类似技术，分析平台使用方式、改善服务性能，并支持个性化功能与安全保护</p>
							</div>
						</div>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>行为数据与 AIOS 奖励相关信息</h2>
						<h3 className="text-lg font-medium text-white">收集的数据类型</h3>
						<ul className={listClassName}>
							<li>登录频率、访问时间、运动参与频率与运动时长</li>
							<li>活动量变化、挑战参与和完成状态、徽章获取历史</li>
							<li>计算奖励所需的使用模式</li>
							<li>用于检测异常使用的系统日志及设备连接信息</li>
						</ul>
						<h3 className="text-lg font-medium text-white">收集目的</h3>
						<p>行为数据可能用于计算用户活动与贡献、计算并发放 AIOS 代币或其他数字奖励、提供个性化统计与反馈、运营挑战和验证结果、检测和防止虚假账户、设备操纵、传感器篡改及异常活动等滥用行为，以及改善服务运营和研究新功能</p>
						<h3 className="text-lg font-medium text-white">AIOS 奖励</h3>
						<p>我们可能根据上述行为数据计算并发放 AIOS 代币或其他数字奖励具体累积方式、计算标准、发放周期、使用范围及失效条件，以另行制定的 AIOS 代币运营政策或相关运营政策为准</p>
						<p>AIOS 代币或其他奖励不等同于现金或法定货币，不应被理解为保证的投资收益或现金兑换工具对于通过不当行为获得的奖励，我们可予以追回或限制相关账户</p>
						<h3 className="text-lg font-medium text-white">数据处理方式</h3>
						<p>我们收集的行为数据可能经过假名化或匿名化处理，使个人无法被直接识别；部分数据可能汇总后用于统计和研究你可以通过平台设置或相关程序管理对行为数据收集和使用的同意，撤回同意可能导致部分功能或奖励累积受到限制</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>从其他来源获得的信息</h2>
						<ul className={listClassName}>
							<li>当你选择使用 Google、Apple 或其他第三方登录服务注册或登录时，我们可能从该服务获得公开资料、标识信息及身份验证相关信息</li>
							<li>我们可能从广告、衡量或分析合作伙伴处获得设备标识符、广告标识符、经哈希处理的联系信息及营销活动响应信息</li>
							<li>当与账户相关的举报、投诉、咨询或法律请求发生时，我们可能从第三方获得与你有关的信息</li>
							<li>我们可能从公开来源收集与你有关的信息</li>
						</ul>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>我们如何使用你的信息</h2>
						<ul className={listClassName}>
							<li>创建账户、登录及识别用户</li>
							<li>连接并同步智能戒指等设备</li>
							<li>提供运动记录、健康数据、统计及个性化反馈</li>
							<li>展示步数、距离、热量、心率和睡眠等测量信息</li>
							<li>运营挑战、发放徽章并计算和提供 AIOS 代币或其他奖励</li>
							<li>处理客户支持、咨询及投诉</li>
							<li>检测和应对滥用、异常活动、欺诈及安全问题</li>
							<li>改善服务质量、开发和研究新功能及改进机器学习模型和算法</li>
							<li>履行法律义务并处理争议</li>
							<li>经你同意提供定位功能，并发送营销和促销信息</li>
						</ul>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>我们如何共享你的信息</h2>
						<h3 className="text-lg font-medium text-white">服务提供商</h3>
						<p>我们可能与支持业务运营的服务提供商共享信息，包括云服务、数据存储与分析、客户支持工具、安全监控及身份验证服务提供商</p>
						<h3 className="text-lg font-medium text-white">分析与衡量合作伙伴</h3>
						<p>为改善服务、分析可用性、衡量性能及分析错误，我们可能与分析和衡量合作伙伴共享信息</p>
						<h3 className="text-lg font-medium text-white">奖励与验证合作伙伴</h3>
						<p>当 AIOS 代币、奖励发放、外部钱包转账、身份或年龄验证及防止欺诈需要时，我们可能与承担相关职能的合作伙伴共享信息</p>
						<h3 className="text-lg font-medium text-white">法律原因</h3>
						<p>为履行法律义务、程序或请求，执行服务条款和运营政策，检测、防止和应对欺诈、安全与技术问题，或保护公司、用户、第三方及公众的权利、财产和安全，我们可能向执法机关、监管机构、公共机关或其他第三方共享信息</p>
						<h3 className="text-lg font-medium text-white">业务转让、合并等</h3>
						<p>若公司进行业务或资产的出售、收购、合并、分立或其他公司交易，你的信息可能作为该交易的一部分被转移</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>你的权利与选择</h2>
						<p>根据适用法律，你可能有权查阅个人信息、要求更正不准确信息、要求删除或停止处理、撤回同意、要求说明个人信息处理情况，以及向相关机构提出投诉</p>
						<p>登录平台后，你可以查看和修改大部分个人资料，也可以通过账户设置管理部分信息的公开范围、通知设置、位置权限、Cookie 及其他权限</p>
						<p>你可以通过浏览器或设备设置限制或拒绝 Cookie，但部分功能可能因此无法正常运行</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>信息安全</h2>
						<p>我们采取合理的技术、管理及物理保护措施来保护你的个人信息，包括访问限制、加密、访问控制及内部管理计划等</p>
						<p>互联网传输本质上无法保证绝对安全，因此我们不能完全保证通过平台传输的信息绝对安全，但会持续维护并改善个人信息保护水平</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>信息保存期限</h2>
						<p>我们会在向你提供平台服务及实现本政策所述目的所必需的期间内保存个人信息为履行合同或法律义务、解决争议、应对滥用、保障安全，或提出、行使和抗辩法律请求，我们也可能继续保存相关信息</p>
						<p>保存期限会因信息类型、收集目的及法律要求而不同例如，账户信息可在账户存续期间保存；发生违反条款或政策的情况时，部分信息可能为调查和应对目的保存更长时间</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>儿童与青少年相关信息</h2>
						<p>原则上，XO RING 不面向未满 14 周岁的儿童相关司法管辖区的法律可能规定更高的最低年龄</p>
						<p>如果我们确认低于适用最低年龄的用户正在使用平台，可能会限制或删除账户，并相应处理相关信息</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>本隐私政策的更新</h2>
						<p>我们可能根据需要不时更新本政策更新时，我们会修改上方的“最后更新”日期，并通过发布更新后的政策或适用法律要求的其他方式通知你</p>
						<p>如果你在更新后的政策生效后继续使用平台，即视为接受更新后的政策；若不同意，请停止使用平台</p>
					</section>

					<section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 mt-16">
						<h2 className="text-xl font-semibold text-white mb-4">联系我们</h2>
						<p>如对本隐私政策有任何疑问、意见、投诉或请求，请通过以下方式联系我们：</p>
						<div className="space-y-2 text-white/75">
							<p className="font-semibold text-white">DEEPCON Inc.</p>
							<p>地址：韩国首尔特别市瑞草区江南大路 89 街 15 号 1 层，邮编 06536</p>
							<p className="pt-3 font-semibold text-white">个人信息保护负责人</p>
							<p>姓名：Park Jungsoo</p>
							<p>邮箱：<a href="mailto:max@thedeepcon.com" className="hover:underline text-amber-100">max@thedeepcon.com</a></p>
							<p>一般咨询：<a href="mailto:info@thedeepcon.com" className="hover:underline text-amber-100">info@thedeepcon.com</a></p>
						</div>
						<p>我们将尽快处理你的请求这不限制你依据适用法律向相关监管机构投诉的权利</p>
					</section>

					<section className="space-y-6 mt-20">
						<h2 className={headingClassName}>补充条款 — 大韩民国</h2>
						<p>如果你在大韩民国使用服务，以下附加条款适用；若与本政策正文冲突，以本附加条款为准</p>

						<div className="space-y-6 pl-4">
							<div>
								<h3 className="text-lg font-medium text-white mb-2">信息保存</h3>
								<p>收集和使用目的达成或保存期限届满后，我们将立即销毁个人信息但适用法律要求保存时，我们会在法定期限内保存，包括：</p>
								<ul className={listClassName}>
									<li>《电子商务等消费者保护法》：合同或撤回要约记录 5 年；付款及商品或服务供应记录 5 年；消费者投诉或争议处理记录 3 年；广告及标识记录 6 个月</li>
									<li>《通信秘密保护法》：网站访问记录 3 个月</li>
								</ul>
							</div>
							<div>
								<h3 className="text-lg font-medium text-white mb-2">个人信息销毁</h3>
								<p>个人信息因保存期限届满或处理目的达成而不再需要时，我们将立即以无法恢复或再现的方式销毁</p>
							</div>
							<div>
								<h3 className="text-lg font-medium text-white mb-2">数据主体权利</h3>
								<p>你可以要求查阅、更正、删除我们持有的个人信息，或要求停止处理，并可通过联系我们行使这些权利</p>
							</div>
							<div>
								<h3 className="text-lg font-medium text-white mb-2">信息安全</h3>
								<p>我们采取技术、管理和物理保护措施，防止个人信息丢失、被盗、泄露、伪造、篡改或损坏</p>
							</div>
							<div>
								<h3 className="text-lg font-medium text-white mb-2">儿童相关信息</h3>
								<p>XO RING 不面向未满 14 周岁的儿童</p>
							</div>
							<div>
								<h3 className="text-lg font-medium text-white mb-2">委托处理及／或个人信息跨境传输</h3>
								<p>我们可能委托国内外服务提供商处理个人信息，或为云存储、分析、客户支持、安全、身份验证及奖励运营等目的跨境传输个人信息发生此类处理时，我们将依据适用法律采取必要的合同、技术和管理保护措施</p>
							</div>
							<div>
								<h3 className="text-lg font-medium text-white mb-2">隐私侵权举报与咨询机构</h3>
								<ul className={listClassName}>
									<li><a href="https://www.kopico.go.kr" target="_blank" rel="noreferrer" className="hover:underline text-amber-100">个人信息保护委员会</a></li>
									<li><a href="https://privacy.kisa.or.kr" target="_blank" rel="noreferrer" className="hover:underline text-amber-100">个人信息侵害申报中心</a></li>
									<li><a href="https://www.spo.go.kr" target="_blank" rel="noreferrer" className="hover:underline text-amber-100">大韩民国检察厅</a></li>
									<li><a href="https://ecrm.police.go.kr" target="_blank" rel="noreferrer" className="hover:underline text-amber-100">韩国警察厅网络犯罪举报系统</a></li>
								</ul>
							</div>
						</div>
					</section>
				</div>
			</div>

			<Footer locale="cn" copy={messages.footer} />
		</main>
	);
}
