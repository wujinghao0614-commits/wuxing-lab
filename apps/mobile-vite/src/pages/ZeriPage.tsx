import { useState } from 'react'

const TianGan = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
const DiZhi = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
const jaZi = ["甲子","乙丑","丙寅","丁卯","戊辰","己巳","庚午","辛未","壬申","癸酉","甲戌","乙亥","丙子","丁丑","戊寅","己卯","庚辰","辛巳","壬午","癸未","甲申","乙酉","丙戌","丁亥","戊子","己丑","庚寅","辛卯","壬辰","癸巳","甲午","乙未","丙申","丁酉","戊戌","己亥","庚子","辛丑","壬寅","癸卯","甲辰","乙巳","丙午","丁未","戊申","己酉","庚戌","辛亥","壬子","癸丑","甲寅","乙卯","丙辰","丁巳","戊午","己未","庚申","辛酉","壬戌","癸亥"]
const wuxing = ["木","火","土","金","水"]

function ZeriPage() {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(3)
  const [day, setDay] = useState(21)
  const [result, setResult] = useState<any>(null)

  const getGanZhi = (y: number, m: number, d: number) => {
    const baseDate = new Date(2020, 0, 1)
    const targetDate = new Date(y, m - 1, d)
    const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / 86400000)
    const gzIndex = (diffDays + 43) % 60
    return jaZi[gzIndex >= 0 ? gzIndex : gzIndex + 60]
  }

  const getWuxing = (gan: string) => {
    const idx = TianGan.indexOf(gan)
    if (idx === -1) return "--"
    return wuxing[Math.floor(idx / 2)]
  }

  const getJianXing = (ganzhi: string) => {
    const jianxing = ["建","除","满","平","定","执","破","危","成","收","开","闭"]
    const idx = DiZhi.indexOf(ganzhi.charAt(1))
    return jianxing[idx]
  }

  const calculate = () => {
    const ganzhi = getGanZhi(year, month, day)
    const gan = ganzhi.charAt(0)
    const zhi = ganzhi.charAt(1)
    const diZhiIdx = DiZhi.indexOf(zhi)

    const pengzu: any = {"甲":"甲不开仓","乙":"乙不栽植","丙":"丙不修灶","丁":"丁不剃头","戊":"戊不受田","己":"己不破券","庚":"庚不经络","辛":"辛不合酱","壬":"壬不汲水","癸":"癸不词讼","子":"子不问卜","丑":"丑不冠带","寅":"寅不祭祀","卯":"卯不穿井","辰":"辰不哭泣","巳":"巳不远行","未":"未不服药","午":"午不苫盖","申":"申不安床","酉":"酉不会客","戌":"戌不吃犬","亥":"亥不嫁娶"}
    const chong: any = {"子":"午","丑":"未","寅":"申","卯":"酉","辰":"戌","巳":"亥","午":"子","未":"丑","申":"寅","酉":"卯","戌":"辰","亥":"巳"}
    const sha: any = {"子":"北","丑":"东北","寅":"东北","卯":"东","辰":"东南","巳":"东南","午":"南","未":"西南","申":"西南","酉":"西","戌":"西北","亥":"西北"}
    
    const xishen = ["东北","东","东南","南","西南","西","西北","北"]
    const fushen = ["西南","西北","北","东北","东","东南","南","西"]
    const caishen = ["东北","东","南","东南","西北","西","西南","北"]
    const guishen = ["西南","西北","北","东北","东","东南","南","西"]
    const shashen = ["申","酉","戌","亥","子","丑","寅","卯"]

    setResult({
      ganzhi,
      wuxing: getWuxing(gan),
      pengzu: (pengzu[gan] || "") + " " + (pengzu[zhi] || ""),
      chongsha: "冲" + (chong[zhi] || "") + " (" + (sha[zhi] || "") + ")",
      jianxing: getJianXing(ganzhi),
      xishen: xishen[diZhiIdx % 8],
      fushen: fushen[diZhiIdx % 8],
      caishen: caishen[diZhiIdx % 8],
      guishen: guishen[diZhiIdx % 8],
      shashen: shashen[diZhiIdx % 8]
    })
  }

  return (
    <div className="page">
      <div className="card">
        <div className="card-title">选择日期</div>
        <div className="date-input">
          <select value={year} onChange={e => setYear(Number(e.target.value))}>
            {[2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030].map(y => (
              <option key={y} value={y}>{y}年</option>
            ))}
          </select>
          <select value={month} onChange={e => setMonth(Number(e.target.value))}>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
              <option key={m} value={m}>{m}月</option>
            ))}
          </select>
          <select value={day} onChange={e => setDay(Number(e.target.value))}>
            {Array.from({length: 31}, (_, i) => i + 1).map(d => (
              <option key={d} value={d}>{d}日</option>
            ))}
          </select>
        </div>
        <div style={{textAlign: 'center'}}>
          <button onClick={calculate} className="hero-btn">开始择日</button>
        </div>
      </div>

      {result && (
        <>
          <div className="card">
            <div className="card-title">📋 基础信息</div>
            <div className="result-row">
              <span className="result-label">干支</span>
              <span className="result-value">{result.ganzhi} ({result.wuxing})</span>
            </div>
            <div className="result-row">
              <span className="result-label">彭祖百忌</span>
              <span className="result-value">{result.pengzu}</span>
            </div>
            <div className="result-row">
              <span className="result-label">冲煞</span>
              <span className="result-value">{result.chongsha}</span>
            </div>
          </div>

          <div className="card">
            <div className="card-title">⭐ 十二建星</div>
            <div className="result-row">
              <span className="result-label">建星</span>
              <span className="result-value">{result.jianxing}</span>
            </div>
          </div>

          <div className="card">
            <div className="card-title">🧭 吉凶方位</div>
            <div className="result-row">
              <span className="result-label">喜神</span>
              <span className="result-value good">{result.xishen}</span>
            </div>
            <div className="result-row">
              <span className="result-label">福神</span>
              <span className="result-value good">{result.fushen}</span>
            </div>
            <div className="result-row">
              <span className="result-label">财神</span>
              <span className="result-value good">{result.caishen}</span>
            </div>
            <div className="result-row">
              <span className="result-label">贵神</span>
              <span className="result-value good">{result.guishen}</span>
            </div>
            <div className="result-row">
              <span className="result-label">煞神</span>
              <span className="result-value bad">{result.shashen}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ZeriPage
