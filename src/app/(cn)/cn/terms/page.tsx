import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getMessages } from '@/lib/i18n';

const messages = getMessages('cn');

export const metadata: Metadata = {
	title: '服务条款 | XO RING',
	description: 'XO RING 服务条款中文页面',
	alternates: {
		canonical: '/cn/terms/',
		languages: {
			en: '/terms/',
			'zh-CN': '/cn/terms/',
		},
	},
};

const headingClassName = 'text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-2 mt-12 mb-4';
const listClassName = 'list-disc pl-6 space-y-2 text-white/70';

export default function ChineseTermsPage() {
	return (
		<main id="main-content" className="min-h-screen bg-black text-white relative" data-header-theme="dark">
			<Header locale="cn" copy={messages.header} />

			<div className="mx-auto max-w-4xl px-4 py-32 pt-40 pb-32 font-sans">
				<div className="mb-16">
					<h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">服务条款</h1>
					<div className="flex flex-wrap gap-4 text-white/50 text-sm font-medium tracking-wide">
						<p>最后更新：2026 年 3 月 12 日</p>
						<span aria-hidden="true">·</span>
						<p>生效日期：2026 年 3 月 12 日</p>
					</div>
				</div>

				<div className="prose prose-invert max-w-none text-white/80 leading-7 space-y-8">
					<section className="space-y-4">
						<h2 className={headingClassName}>条款目的</h2>
						<p>本服务条款（以下简称“本条款”）规定 DEEPCON Co., Ltd.（以下简称“DEEPCON”或“公司”）与用户之间, 就使用 XO RING 相关网站、应用程序、设备连接功能、运动及健康记录服务、奖励服务以及其他附属服务（统称“服务”）所享有的权利、承担的义务与责任</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>条款的生效</h2>
						<ul className={listClassName}>
							<li>用户同意本条款并申请或实际使用公司提供的服务时, 本条款即生效</li>
							<li>用户使用服务, 即视为同意本条款、隐私政策、社区运营政策, 以及公司另行制定的包括 AIOS 代币或奖励相关政策在内的其他政策上述各项政策均构成本条款不可分割的一部分</li>
							<li>服务可能在韩国及其他国家或地区提供根据各适用司法管辖区的法律法规, 可能适用附加条款；如本条款与特定司法管辖区的附加条款发生冲突, 以该附加条款为准</li>
						</ul>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>条款的修改</h2>
						<ul className={listClassName}>
							<li>因服务变更、功能增减、适用法律法规变化、设备连接方式变化或奖励政策调整等原因, 公司可在必要时修改本条款</li>
							<li>公司修改本条款时, 将通过服务内公告或其他合理方式, 提前说明修改内容、生效日期及修改理由若修改内容对用户具有重大不利影响或属于其他重要事项, 公司将在合理期限内另行提前通知</li>
							<li>用户在修改后的条款生效后继续使用服务, 即视为同意修改后的条款</li>
						</ul>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>用户账户</h2>
						<p>用户可能需要创建账户才能使用全部或部分服务用户应提供准确、最新的信息, 并在信息发生变化时及时更新</p>
						<p>用户有责任妥善保管账户凭据和密码, 不得与任何第三方共享除因公司故意或重大过失造成的情况外, 用户应对通过其账户进行的活动负责</p>
						<p>若公司有合理理由认定存在下列情形, 可限制、暂停或终止用户账户：</p>
						<ul className={listClassName}>
							<li>违反本条款或相关政策</li>
							<li>试图操纵活动数据或以不当方式获取奖励</li>
							<li>异常使用设备或账户</li>
							<li>侵犯他人权利或违反适用法律法规</li>
							<li>损害服务稳定性或可靠性的行为</li>
						</ul>
						<p>用户申请注销账户时, 公司将依据适用法律及内部政策处理账户注销后, 部分或全部活动记录、奖励记录、徽章及设置可能无法恢复</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>服务范围</h2>
						<p>公司可能向用户提供以下服务：</p>
						<ul className={listClassName}>
							<li>智能戒指等兼容设备的登记与连接</li>
							<li>运动类型选择及运动记录功能</li>
							<li>步数、移动距离、消耗热量、心率（BPM）、血氧饱和度（SpO2）及睡眠等健康和活动数据展示</li>
							<li>跑步、骑行、步行、徒步、游泳、健身、高尔夫、皮划艇、力量训练、划船和滑雪等活动的运动记录</li>
							<li>挑战参与、徽章获取及活动历史查询</li>
							<li>根据活动量或贡献提供 AIOS 代币或其他数字奖励</li>
							<li>公司另行提供的其他功能</li>
						</ul>
						<p>公司可因运营或技术原因, 在必要时变更、暂停或限制部分服务</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>设备连接与测量数据</h2>
						<p>服务可与智能戒指等外部设备配合使用用户理解并同意, 部分功能或测量值可能因设备连接状态、电池状态、传感器精度、操作系统环境及网络状况而有所不同</p>
						<p>服务展示的活动及健康相关数据仅作为一般信息和个人记录管理的参考服务不能替代医疗行为、诊断、治疗、紧急处置或专业医疗建议</p>
						<ul className={listClassName}>
							<li>测量值可能与用户实际身体状况存在差异</li>
							<li>心率、睡眠、血氧饱和度等数据仅供参考, 不得作为医疗判断的唯一依据</li>
							<li>如用户怀疑身体存在异常, 应咨询医生或具备资质的医疗机构</li>
						</ul>
						<p>服务及连接设备提供的信息仅用于一般健康和活动管理参考, 不应被理解为医疗器械或医疗服务</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>服务使用与禁止行为</h2>
						<p>用户必须遵守本条款、适用法律及公司政策使用服务, 不得实施以下行为：</p>
						<ul className={listClassName}>
							<li>使用虚假信息创建账户, 或未经授权使用他人信息</li>
							<li>为获取不当奖励而由同一用户创建多个账户</li>
							<li>通过自动化程序、宏、模拟器、篡改传感器、伪造位置、异常设备连接或类似方式操纵活动数据或骗取奖励</li>
							<li>故意造成或利用智能戒指或连接设备的故障</li>
							<li>对服务或系统进行逆向工程、反汇编、反编译或规避安全措施</li>
							<li>干扰服务稳定运行</li>
							<li>未经授权访问或试图访问他人账户</li>
							<li>未经公司同意将服务用于商业或营利目的</li>
							<li>违反适用法律、公共秩序、社会道德或第三方权利</li>
							<li>公司合理认定不适合服务的其他行为</li>
						</ul>
						<p>若上述行为经确认或存在合理怀疑, 公司可采取调查、保存记录、暂缓发放奖励、限制账户、限制挑战参与或使代币失效等措施</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>健康与活动数据的收集和使用</h2>
						<p>用户使用服务时, 公司可能收集、分析或处理以下数据：</p>
						<ul className={listClassName}>
							<li>步数、移动距离和消耗热量</li>
							<li>心率（BPM）和血氧饱和度（SpO2）</li>
							<li>睡眠相关信息</li>
							<li>运动类型、运动时间、运动频率及活动量</li>
							<li>设备连接与同步信息</li>
							<li>挑战参与和徽章获取记录</li>
							<li>服务日志、访问记录和错误记录</li>
						</ul>
						<p>公司可能将上述数据用于提供运动记录、改善健康管理便利性、提供个性化统计与反馈、运营挑战和发放徽章、检测异常使用和防止奖励欺诈、提升服务质量和系统稳定性、计算 AIOS 代币或其他奖励, 以及履行法律义务具体收集项目、处理方式、保存期限及向第三方提供等事项, 以隐私政策为准</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>AIOS 代币与奖励</h2>
						<p>公司可根据用户的活动量、参与情况或公司确定的其他标准, 以数字奖励或积分奖励的形式提供权益, 具体名称、发放方式和运营标准由另行制定的政策规定</p>
						<ol className="list-decimal pl-6 space-y-2 text-white/70">
							<li>AIOS 代币或奖励按照公司另行制定的政策运营</li>
							<li>是否发放奖励、发放时间、数量、计算方式及参与条件可根据公司运营政策变更</li>
							<li>以不当方式获得的奖励可被取消、追回或作废</li>
							<li>因服务运营、法律要求、政策更新或技术原因, 奖励可能被暂停、限制或变更</li>
							<li>除非另有明确说明, 奖励不具有与法定货币相同的价值, 也不得被理解为保证的投资收益或现金兑换工具</li>
						</ol>
						<p>严禁生成虚假活动数据、操纵设备或制造虚假活动、利用多个账户或组织化方式领取奖励、以违背服务目的的方式获取代币, 以及使用公司不允许的转账、交易或兑换方式</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>挑战与徽章</h2>
						<p>公司可为用户提供参与挑战和获取徽章的机会挑战类型、参与要求、达成标准、期限及是否提供奖励, 可依据公司政策而有所不同</p>
						<p>徽章是用于直观展示用户活动历史的数字标识, 除非另有规定, 不具有财产价值或法律权利</p>
						<p>检测到异常数据、确认违反运营政策, 或因系统或设备错误导致不当发放时, 公司可取消或限制挑战成果及徽章发放</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>知识产权</h2>
						<p>服务、应用程序、界面、设计、标识、商标、软件、图像、文字、图形、数据结构及其他相关内容的全部知识产权, 归公司或合法权利人所有</p>
						<p>除本条款或适用法律允许的范围外, 未经公司事先书面同意, 用户不得复制、分发、传输、修改、制作衍生作品、出售、许可或以商业方式利用服务的全部或任何部分</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>免责声明与保证限制</h2>
						<p>公司将尽合理努力稳定提供服务但受设备连接状态、传感器特性、网络状况、操作系统环境及其他技术条件影响, 服务可能受到限制或测量值可能存在误差公司不保证服务始终不中断、所有测量数据完全准确、任何特定运动成果、健康改善或奖励结果必然实现, 也不保证所有错误或缺陷均能立即修复</p>
						<p>公司会以合理注意义务管理服务, 但对于因用户设备状况、传感器错误或网络不稳定、第三方平台或外部设备故障、用户不当使用或错误健康判断、未安装免费更新或不符合最低系统要求, 以及法律法规限制服务所造成的损失, 不承担责任</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>责任限制</h2>
						<p>在适用法律允许的范围内, 公司不对因使用服务而产生的间接损失、特殊损失、后果性损失、经营损失或预期利润损失承担责任但因公司故意或重大过失造成的损失除外, 并依适用法律处理</p>
						<p>测量数据、健康数据、运动记录、挑战结果及奖励明细可能因系统和设备状况而存在差异或错误, 公司不保证超出合理范围的准确性</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>账户限制与服务限制</h2>
						<p>若存在违反本条款或运营政策、涉嫌或确认不当使用、可能违反适用法律、为确保系统稳定与安全, 或为保护第三方权利等情形, 公司可提前通知限制服务；情况紧急时, 也可先采取措施后再通知</p>
						<p>必要时, 公司可暂时停用或删除账户、限制挑战参与或撤销徽章、暂缓或取消 AIOS 代币奖励, 以及限制设备连接</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>年龄限制</h2>
						<p>原则上, 本服务面向年满 14 周岁的用户若适用司法管辖区的法律规定更高的最低年龄要求, 以该要求为准</p>
						<p>未成年人使用服务时, 可能需要其法定代理人同意</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>适用法律与管辖</h2>
						<p>本条款受大韩民国法律管辖</p>
						<p>因本条款或服务产生或与之相关的任何争议, 以对公司主要办公地点有管辖权的法院作为第一审专属管辖法院</p>
					</section>

					<section className="space-y-4">
						<h2 className={headingClassName}>其他</h2>
						<ul className={listClassName}>
							<li>本条款任何条款被认定无效或不可执行时, 其余条款仍然完全有效</li>
							<li>公司未行使本条款项下的任何权利, 不应被解释为放弃该权利</li>
							<li>服务中包含的部分开源软件可能适用其各自的许可条款</li>
						</ul>
					</section>
				</div>
			</div>

			<Footer locale="cn" copy={messages.footer} />
		</main>
	);
}
