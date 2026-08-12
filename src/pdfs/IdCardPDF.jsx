import { useMemo } from 'react'
import { Page, Text, View, Document, StyleSheet, Svg, Rect, Image } from '@react-pdf/renderer'
import qrcode from 'qrcode-generator'

const C = {
  saffron: '#DE651A',
  saffronDeep: '#C0550A',
  saffronLight: '#FF8C38',
  gold: '#B08A3E',
  goldDeep: '#8C6E2F',
  cream: '#FBF6EC',
  creamLight: '#FFFDF8',
  ink: '#2B2113',
  inkMuted: '#6E6352',
  line: '#E3D8C2',
  white: '#FFFFFF',
}

const P = (mm) => Number((mm * 2.834645669).toFixed(2))

const shrink = (base, text, min = 7) => {
  const n = text ? String(text).length : 0
  if (n <= 20) return base
  if (n <= 32) return Math.max(min, base - 2)
  if (n <= 46) return Math.max(min, base - 4)
  return Math.max(min, base - 6)
}

const fmtDate = (iso) => {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return '—'
  }
}

function QRBox({ value, size }) {
  const qr = useMemo(() => {
    const q = qrcode(0, 'M')
    q.addData(value)
    q.make()
    return q
  }, [value])

  const count = qr.getModuleCount()
  const cells = []
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) cells.push({ x: c, y: r })
    }
  }

  return (
    <View style={{ width: size, height: size, padding: P(3), backgroundColor: C.white, borderWidth: 2, borderColor: C.gold, borderRadius: P(3), alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size - P(8)} height={size - P(8)} viewBox={`0 0 ${count} ${count}`}>
        {cells.map((cell, i) => (
          <Rect key={i} x={cell.x} y={cell.y} width={1} height={1} fill="#1A1100" />
        ))}
      </Svg>
    </View>
  )
}

function DetailRow({ label, labelDeva, value, mono = false, big = false }) {
  const hasDeva = typeof value === 'string' && /[\u0900-\u097F]/.test(value)
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailLabelRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[styles.detailLabel, styles.detailLabelDeva]}>{labelDeva ? ` · ${labelDeva}` : ''}</Text>
      </View>
      <Text
        style={[
          styles.detailValue,
          { fontSize: shrink(big ? 11 : 9.5, value) },
          mono && !hasDeva && styles.mono,
          hasDeva && { fontFamily: 'NotoDeva', fontWeight: 700 },
        ]}
      >
        {value || '—'}
      </Text>
      <View style={styles.detailLine} />
    </View>
  )
}

function Pillar({ icon, title, hi }) {
  return (
    <View style={{ width: P(24), alignItems: 'center' }}>
      <View style={styles.pillarCircle}>
        <Text style={styles.pillarCircleText}>{icon}</Text>
      </View>
      <Text style={styles.pillarTitle}>{title}</Text>
      <Text style={styles.pillarHi}>{hi}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: C.cream,
  },
  root: {
    width: P(148),
    height: P(210),
    position: 'relative',
    overflow: 'hidden',
  },
  outerFrame: {
    position: 'absolute',
    left: P(2.5),
    top: P(2.5),
    width: P(143),
    height: P(205),
    borderWidth: 2,
    borderColor: C.gold,
    borderRadius: P(10),
  },
  innerFrame: {
    position: 'absolute',
    left: P(5.5),
    top: P(5.5),
    width: P(137),
    height: P(199),
    borderWidth: 1,
    borderColor: C.saffron,
    borderRadius: P(7),
  },

  /* ── shared ── */
  diamond: { position: 'absolute', width: P(5), height: P(5), backgroundColor: C.gold, transform: 'rotate(45deg)' },
  headerLine: { position: 'absolute', left: P(10), width: P(128), height: 1, backgroundColor: C.gold, opacity: 0.7 },

  /* ── FRONT: top band ── */
  logoCircle: {
    position: 'absolute',
    left: P(64),
    top: P(16),
    width: P(20),
    height: P(20),
    borderRadius: P(10),
    borderWidth: 1.4,
    borderColor: C.gold,
    backgroundColor: '#FFF1E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { fontFamily: 'NotoDeva', fontSize: 12, color: C.saffronDeep, fontWeight: 700 },
  photoBox: {
    position: 'absolute',
    left: P(12),
    top: P(9),
    width: P(44),
    height: P(48),
    borderWidth: 1.4,
    borderColor: C.gold,
    borderStyle: 'dashed',
    borderRadius: P(6),
    backgroundColor: '#FFF7EA',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoImage: { width: '100%', height: '100%', objectFit: 'contain' },
  photoText: { fontSize: 8, color: C.inkMuted, textAlign: 'center', letterSpacing: 1.5 },
  photoDeva: { fontFamily: 'NotoDeva', fontSize: 8, color: C.saffronDeep, marginTop: 3, textAlign: 'center' },
  qrBox: { position: 'absolute', left: P(102), top: P(9), width: P(36), height: P(36), alignItems: 'center', justifyContent: 'center' },
  qrCaption: { position: 'absolute', left: P(98), top: P(46), width: P(44), fontSize: 6, color: C.inkMuted, letterSpacing: 1, textAlign: 'center' },
  qrVerify: { position: 'absolute', left: P(98), top: P(51.5), width: P(44), fontFamily: 'NotoDeva', fontSize: 6, color: C.saffronDeep, textAlign: 'center' },

  /* ── FRONT: org name band ── */
  orgEn: { position: 'absolute', left: P(8), top: P(63), width: P(132), fontSize: 11, fontWeight: 'bold', color: C.saffronDeep, letterSpacing: 1.5, textAlign: 'center' },
  orgDeva: { position: 'absolute', left: P(8), top: P(71.5), width: P(132), fontFamily: 'NotoDeva', fontSize: 9, color: C.saffron, textAlign: 'center' },

  /* ── FRONT: details ── */
  detailRow: { position: 'absolute', left: P(14), width: P(120) },
  detailLabelRow: { flexDirection: 'row' },
  detailLabel: { fontSize: 6, color: C.inkMuted, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 'bold' },
  detailLabelDeva: { fontFamily: 'NotoDeva', color: C.goldDeep },
  detailValue: { fontWeight: 'bold', color: C.ink, marginTop: P(1.2) },
  mono: { fontFamily: 'Courier', letterSpacing: 1 },
  detailLine: { height: 0.7, backgroundColor: C.line, marginTop: P(2.2) },

  /* ── FRONT: signature / validity ── */
  signLine: { position: 'absolute', width: P(48), height: 1, backgroundColor: C.ink, opacity: 0.55 },
  signText: { position: 'absolute', fontSize: 6, color: C.inkMuted, letterSpacing: 1.2, textTransform: 'uppercase' },
  seal: {
    position: 'absolute',
    width: P(24),
    height: P(24),
    borderRadius: P(12),
    borderWidth: 1.3,
    borderColor: C.gold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.cream,
  },
  sealText: { fontSize: 6.5, fontWeight: 'bold', color: C.goldDeep, textAlign: 'center', letterSpacing: 1 },
  validityRow: { position: 'absolute', left: P(14), width: P(120), flexDirection: 'row', justifyContent: 'space-between' },
  validityLabel: { fontSize: 6, color: C.inkMuted, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 'bold' },
  validityValue: { fontSize: 9, fontWeight: 'bold', color: C.saffronDeep, marginTop: P(1) },
  footerBand: { position: 'absolute', left: P(12), top: P(197), width: P(124), height: P(7.5), backgroundColor: C.saffron, borderRadius: P(3), alignItems: 'center', justifyContent: 'center' },
  footerText: { fontFamily: 'NotoDeva', fontSize: 8.5, color: C.white, letterSpacing: 1.5 },

  /* ── BACK ── */
  backTitle: { position: 'absolute', left: P(8), top: P(10), width: P(132), fontSize: 14, fontWeight: 'bold', color: C.ink, letterSpacing: 2, textAlign: 'center' },
  backTitleDeva: { position: 'absolute', left: P(8), top: P(20), width: P(132), fontFamily: 'NotoDeva', fontSize: 9, color: C.saffron, textAlign: 'center' },
  missionText: { position: 'absolute', left: P(14), top: P(33), width: P(120), fontSize: 8, color: C.ink, lineHeight: 1.7, textAlign: 'left' },
  missionTextHi: { position: 'absolute', left: P(14), top: P(58), width: P(120), fontFamily: 'NotoDeva', fontSize: 7.5, color: C.inkMuted, lineHeight: 1.6, textAlign: 'justify' },
  pillarsLabelRow: { position: 'absolute', left: P(8), top: P(76), width: P(132), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  pillarsLabel: { fontSize: 7, fontWeight: 'bold', color: C.goldDeep, letterSpacing: 2 },
  pillarsLabelDeva: { fontFamily: 'NotoDeva', letterSpacing: 1 },
  pillarsRow: { position: 'absolute', left: P(12), top: P(84), width: P(124), flexDirection: 'row', justifyContent: 'space-between' },
  pillarCircle: { width: P(16), height: P(16), borderRadius: P(8), backgroundColor: C.saffron, alignItems: 'center', justifyContent: 'center' },
  pillarCircleText: { fontFamily: 'NotoDeva', fontSize: 9, color: C.white, fontWeight: 700 },
  pillarTitle: { fontSize: 5.5, color: C.ink, fontWeight: 'bold', marginTop: P(2.5), textAlign: 'center' },
  pillarHi: { fontFamily: 'NotoDeva', fontSize: 5, color: C.inkMuted, marginTop: P(1), textAlign: 'center' },
  emgLabelRow: { position: 'absolute', left: P(14), top: P(120), flexDirection: 'row', alignItems: 'center' },
  emgLabel: { fontSize: 8, fontWeight: 'bold', color: C.saffronDeep, letterSpacing: 1.5 },
  emgLabelDeva: { fontFamily: 'NotoDeva', fontSize: 7, color: C.goldDeep },
  emgRow: { position: 'absolute', left: P(14), width: P(82), flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.7, borderBottomColor: C.line, paddingBottom: P(2) },
  emgLabel2: { fontSize: 6, color: C.inkMuted, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 'bold' },
  emgValue: { fontSize: 8, fontWeight: 'bold', color: C.ink },
  emgQr: { position: 'absolute', left: P(100), top: P(124), width: P(40), height: P(40), alignItems: 'center', justifyContent: 'center' },
  emgQrCaption: { position: 'absolute', left: P(100), top: P(166), width: P(40), fontSize: 5.5, color: C.inkMuted, letterSpacing: 1, textAlign: 'center' },
  footerBand2: { position: 'absolute', left: P(12), top: P(197), width: P(124), height: P(7.5), backgroundColor: C.ink, borderRadius: P(3), alignItems: 'center', justifyContent: 'center' },
  backFooterText: { fontSize: 4.5, color: C.white, letterSpacing: 0.5, textAlign: 'center' },
})

export default function IdCardPDF({ data }) {
  const memberId = data?.member_id || '—'
  const fullName = data?.full_name || '—'
  const mobile = data?.emergency_contact || '—'
  const verifyUrl = `https://rhrsdemo2.vercel.app/verify/${memberId}`
  const photoUrl = data?.photo_url || data?.photo || null

  const pillars = [
    { icon: 'ध', title: 'DHARMA', hi: 'धर्म रक्षा' },
    { icon: 'गौ', title: 'GAU', hi: 'गौ रक्षा' },
    { icon: 'सं', title: 'SANSKRITI', hi: 'संस्कृति रक्षा' },
    { icon: 'सम', title: 'SAMAJ', hi: 'समाज सेवा' },
    { icon: 'रा', title: 'RASHTRA', hi: 'राष्ट्र रक्षा' },
  ]

  const mission = [
    'To protect and promote Hindu Dharma, Culture and Values.',
    'To serve the society with dedication and honesty.',
    'To unite Hindus and build a strong, self-reliant and prosperous Hindu Rashtra.',
  ]

  return (
    <Document>
      {/* ───────────── FRONT ───────────── */}
      <Page wrap={false} size={[P(148), P(210)]} style={styles.page}>
        <View style={styles.root}>
          <View style={styles.outerFrame} />
          <View style={styles.innerFrame} />

          {/* Top band: photo (left) · logo (center) · QR (right) */}
          <View style={styles.photoBox}>
            {photoUrl ? (
              <Image src={photoUrl} style={styles.photoImage} />
            ) : (
              <>
                <Text style={styles.photoText}>PHOTO</Text>
                <Text style={styles.photoDeva}>फोटो</Text>
              </>
            )}
          </View>
          <View style={styles.logoCircle}>
            <Image src="/logo.png" style={{ width: P(16), height: P(16), objectFit: 'contain' }} />
          </View>
          <View style={styles.qrBox}>
            <QRBox value={verifyUrl} size={P(30)} />
          </View>
          <Text style={styles.qrCaption}>Scan to Verify</Text>
          <Text style={styles.qrVerify}>सत्यापन</Text>

          {/* Org name band */}
          <View style={[styles.headerLine, { top: P(60.5) }]} />
          <View style={[styles.diamond, { left: P(74), top: P(58) }]} />
          <Text style={styles.orgEn}>RASHTRIYA HINDU RAKSHAK SANGH (RHRS)</Text>
          <Text style={styles.orgDeva}>राष्ट्रीय हिन्दू रक्षक संघ</Text>
          <View style={[styles.headerLine, { top: P(80) }]} />

          {/* Details */}
          <View style={[styles.detailRow, { top: P(84) }]}>
            <DetailRow label="Name" labelDeva="नाम" value={fullName} big />
          </View>
          <View style={[styles.detailRow, { top: P(96) }]}>
            <DetailRow label="Designation" labelDeva="पद" value="ACTIVE MEMBER" />
          </View>
          <View style={[styles.detailRow, { top: P(108) }]}>
            <DetailRow label="Member ID" labelDeva="सदस्य क्रमांक" value={memberId} mono />
          </View>
          <View style={[styles.detailRow, { top: P(120) }]}>
            <DetailRow label="Blood Group" labelDeva="रक्त समूह" value={data?.blood_group || '—'} />
          </View>
          <View style={[styles.detailRow, { top: P(132) }]}>
            <DetailRow label="Mobile" labelDeva="मोबाइल" value={mobile} mono />
          </View>

          {/* Signature */}
          <View style={[styles.signLine, { left: P(14), top: P(146) }]} />
          <Text style={[styles.signText, { left: P(14), top: P(149) }]}>Member Signature</Text>
          <View style={[styles.seal, { left: P(62), top: P(137) }]}>
            <Text style={styles.sealText}>RHRS</Text>
            <Text style={[styles.sealText, { fontFamily: 'NotoDeva', fontSize: 5 }]}>संघ</Text>
          </View>
          <View style={[styles.signLine, { left: P(96), top: P(146) }]} />
          <Text style={[styles.signText, { left: P(96), top: P(149) }]}>Authorised Signatory</Text>

          {/* Validity */}
          <View style={[styles.validityRow, { top: P(164) }]}>
            <View>
              <Text style={styles.validityLabel}>Validity</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: P(1) }}>
                <Text style={styles.validityValue}>Lifetime</Text>
                <Text style={[styles.validityValue, { fontFamily: 'NotoDeva', fontSize: 8 }]}> · आजीवन</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.validityLabel}>Issue Date</Text>
              <Text style={[styles.validityValue, { fontSize: 8.5 }]}>{fmtDate(data?.created_at)}</Text>
            </View>
          </View>

          <View style={[styles.headerLine, { top: P(178), opacity: 0.5 }]} />

          {/* Footer */}
          <View style={styles.footerBand}>
            <Text style={styles.footerText}>॥ धर्मो रक्षति रक्षितः ॥</Text>
          </View>
        </View>
      </Page>

      {/* ───────────── BACK ───────────── */}
      <Page wrap={false} size={[P(148), P(210)]} style={styles.page}>
        <View style={styles.root}>
          <View style={styles.outerFrame} />
          <View style={styles.innerFrame} />

          <Text style={styles.backTitle}>OUR MISSION</Text>
          <Text style={styles.backTitleDeva}>हमारा उद्देश्य</Text>
          <View style={[styles.diamond, { left: P(74), top: P(25) }]} />
          <View style={[styles.headerLine, { top: P(27.5) }]} />

          <Text style={styles.missionText}>
            {mission.map((m, i) => `${i + 1}.  ${m}`).join('\n')}
          </Text>
          <Text style={styles.missionTextHi}>
            राष्ट्रीय हिन्दू रक्षक संघ हिन्दू धर्म, संस्कृति एवं राष्ट्र की रक्षा तथा समाज की निःस्वार्थ सेवा हेतु समर्पित संगठन है।
          </Text>

          <View style={[styles.headerLine, { top: P(73) }]} />

          <View style={styles.pillarsLabelRow}>
            <Text style={styles.pillarsLabel}>OUR PILLARS</Text>
            <Text style={[styles.pillarsLabel, styles.pillarsLabelDeva]}> · हमारे स्तंभ</Text>
          </View>
          <View style={styles.pillarsRow}>
            {pillars.map((v) => (
              <Pillar key={v.title} icon={v.icon} title={v.title} hi={v.hi} />
            ))}
          </View>

          <View style={[styles.headerLine, { top: P(116) }]} />

          {/* Emergency contact */}
          <View style={styles.emgLabelRow}>
            <Text style={styles.emgLabel}>EMERGENCY CONTACT</Text>
            <Text style={[styles.emgLabel, styles.emgLabelDeva]}> · आपातकालीन संपर्क</Text>
          </View>
          <View style={[styles.emgRow, { top: P(128) }]}>
            <Text style={styles.emgLabel2}>Phone</Text>
            <Text style={styles.emgValue}>{mobile}</Text>
          </View>
          <View style={[styles.emgRow, { top: P(138) }]}>
            <Text style={styles.emgLabel2}>Email</Text>
            <Text style={[styles.emgValue, { fontFamily: 'Courier', fontSize: 7.5 }]}>contact@rhns.org</Text>
          </View>
          <View style={[styles.emgRow, { top: P(148) }]}>
            <Text style={styles.emgLabel2}>Website</Text>
            <Text style={[styles.emgValue, { fontFamily: 'Courier', fontSize: 7.5 }]}>rhrsdemo2.vercel.app</Text>
          </View>
          <View style={[styles.emgRow, { top: P(158) }]}>
            <Text style={styles.emgLabel2}>Social</Text>
            <Text style={styles.emgValue}>/rhrsorg</Text>
          </View>
          <View style={[styles.emgRow, { top: P(168) }]}>
            <Text style={styles.emgLabel2}>Membership</Text>
            <Text style={[styles.emgValue, { fontFamily: 'NotoDeva' }]}>Lifetime · आजीवन</Text>
          </View>

          <View style={styles.emgQr}>
            <QRBox value={verifyUrl} size={P(34)} />
          </View>
          <Text style={styles.emgQrCaption}>scan the code</Text>

          {/* Footer */}
          <View style={styles.footerBand2}>
            <Text style={styles.backFooterText}>THIS CARD IS THE PROPERTY OF RHRS.</Text>
            <Text style={[styles.backFooterText, { marginTop: 1 }]}>IF FOUND, PLEASE RETURN TO THE NEAREST RHRS OFFICE.</Text>
            <Text style={[styles.backFooterText, { fontFamily: 'NotoDeva', marginTop: 1 }]}>यह कार्ड आर.एच.आर.एस. की संपत्ति है</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
