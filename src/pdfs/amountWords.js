const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

function twoDigits(n) {
  if (n < 20) return ones[n]
  return `${tens[Math.floor(n / 10)]}${n % 10 ? ` ${ones[n % 10]}` : ''}`
}

function threeDigits(n) {
  const h = Math.floor(n / 100)
  const rest = n % 100
  return `${h ? `${ones[h]} Hundred${rest ? ' ' : ''}` : ''}${rest ? twoDigits(rest) : ''}`
}

export function amountInWords(amount) {
  const rupees = Math.floor(amount)
  const paise = Math.round((amount - rupees) * 100)
  let words = ''
  const crore = Math.floor(rupees / 10000000)
  const lakh = Math.floor((rupees % 10000000) / 100000)
  const thousand = Math.floor((rupees % 100000) / 1000)
  const rest = rupees % 1000

  if (crore) words += `${threeDigits(crore)} Crore `
  if (lakh) words += `${threeDigits(lakh)} Lakh `
  if (thousand) words += `${threeDigits(thousand)} Thousand `
  if (rest) words += threeDigits(rest)
  words += ' Rupees Only'
  if (paise) words += ` and ${twoDigits(paise)} Paise Only`
  return words.trim()
}
