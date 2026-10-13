/**
 * Canonical Hadith Collections & Islamic Sciences Registry
 * Al-Burhan Academy - Hifzul Wahyain Specialized Track
 */

export interface HadithBookItem {
  id: string
  title: string
  arabicTitle: string
  author: string
  category: 'Sihah Sittah' | 'Masanid & Jawami' | 'Ahkam & Tarbiyah'
}

export const canonicalHadithBooks: HadithBookItem[] = [
  {
    id: 'bukhari',
    title: 'Sahih al-Bukhari',
    arabicTitle: 'صحيح البخاري',
    author: 'Imam Muhammad al-Bukhari (رحمه الله)',
    category: 'Sihah Sittah',
  },
  {
    id: 'muslim',
    title: 'Sahih Muslim',
    arabicTitle: 'صحيح مسلم',
    author: 'Imam Muslim ibn al-Hajjaj (رحمه الله)',
    category: 'Sihah Sittah',
  },
  {
    id: 'abu-dawud',
    title: 'Sunan Abi Dawud',
    arabicTitle: 'سنن أبي داود',
    author: 'Imam Abu Dawud as-Sijistani (رحمه الله)',
    category: 'Sihah Sittah',
  },
  {
    id: 'tirmidhi',
    title: "Jami' at-Tirmidhi",
    arabicTitle: 'جامع الترمذي / سنن الترمذي',
    author: 'Imam Abu Isa at-Tirmidhi (رحمه الله)',
    category: 'Sihah Sittah',
  },
  {
    id: 'nasai',
    title: "Sunan an-Nasa'i (Al-Mujtaba)",
    arabicTitle: 'سنن النسائي (المجتبى)',
    author: 'Imam Ahmad an-Nasa’i (رحمه الله)',
    category: 'Sihah Sittah',
  },
  {
    id: 'ibn-majah',
    title: 'Sunan Ibn Majah',
    arabicTitle: 'سنن ابن ماجه',
    author: 'Imam Ibn Majah al-Qazwini (رحمه الله)',
    category: 'Sihah Sittah',
  },
  {
    id: 'muwatta',
    title: 'Muwatta Malik',
    arabicTitle: 'موطأ الإمام مالك',
    author: 'Imam Malik ibn Anas (رحمه الله)',
    category: 'Masanid & Jawami',
  },
  {
    id: 'musnad-ahmad',
    title: 'Musnad Ahmad',
    arabicTitle: 'مسند الإمام أحمد بن حنبل',
    author: 'Imam Ahmad ibn Hanbal (رحمه الله)',
    category: 'Masanid & Jawami',
  },
  {
    id: 'riyadh-salihin',
    title: 'Riyadh as-Salihin',
    arabicTitle: 'رياض الصالحين',
    author: 'Imam Yahya an-Nawawi (رحمه الله)',
    category: 'Ahkam & Tarbiyah',
  },
  {
    id: 'bulugh-maram',
    title: 'Bulugh al-Maram min Adillat al-Ahkam',
    arabicTitle: 'بلوغ المرام من أدلة الأحكام',
    author: 'Al-Hafidh Ibn Hajar al-Asqalani (رحمه الله)',
    category: 'Ahkam & Tarbiyah',
  },
  {
    id: 'arbain-nawawi',
    title: "Al-Arba'in an-Nawawiyyah (40 Hadith)",
    arabicTitle: 'الأربعون النووية',
    author: 'Imam Yahya an-Nawawi (رحمه الله)',
    category: 'Ahkam & Tarbiyah',
  },
  {
    id: 'umdat-ahkam',
    title: 'Umdat al-Ahkam',
    arabicTitle: 'عمدة الأحكام من كلام خير الأنام',
    author: 'Al-Hafidh Abdul-Ghani al-Maqdisi (رحمه الله)',
    category: 'Ahkam & Tarbiyah',
  },
  {
    id: 'mishkat-masabih',
    title: 'Mishkat al-Masabih',
    arabicTitle: 'مشكاة المصابيح',
    author: 'Al-Khatib at-Tabrizi (رحمه الله)',
    category: 'Masanid & Jawami',
  },
]

export const qiraatRiwayatList: { name: string; arabic: string; popularRegion: string }[] = [
  {
    name: "Hafs 'an 'Asim",
    arabic: 'حفص عن عاصم الكوفي',
    popularRegion: 'Global standard / Most widespread',
  },
  {
    name: "Warsh 'an Nafi'",
    arabic: 'ورش عن نافع المدني',
    popularRegion: 'North & West Africa (Traditional Nigerian Tajweed)',
  },
  {
    name: "Qalun 'an Nafi'",
    arabic: 'قالون عن نافع المدني',
    popularRegion: 'Libya, Tunisia, parts of West Africa',
  },
  {
    name: "Ad-Duri 'an Abi 'Amr",
    arabic: 'الدوري عن أبي عمرو البصري',
    popularRegion: 'Sudan, East Africa, parts of West Africa',
  },
  {
    name: "Shu'bah 'an 'Asim",
    arabic: 'شعبة عن عاصم الكوفي',
    popularRegion: 'Specialized Ijazah recitations',
  },
  {
    name: "As-Susi 'an Abi 'Amr",
    arabic: 'السوسي عن أبي عمرو البصري',
    popularRegion: 'Specialized Ijazah recitations',
  },
  {
    name: "Ibn Kathir al-Makki (Al-Bazzi & Qunbul)",
    arabic: 'قراءة ابن كثير المكي',
    popularRegion: 'Makkah / Ten Qira’at syllabus',
  },
  {
    name: 'Abu Ja’far al-Madani',
    arabic: 'قراءة أبي جعفر المدني',
    popularRegion: 'Ten Qira’at syllabus',
  },
  {
    name: 'Khalaf & Khallad ‘an Hamzah',
    arabic: 'قراءة حمزة الكوفي (خلف وخلاد)',
    popularRegion: 'Ten Qira’at syllabus',
  },
]

export const arabicQualificationsList: string[] = [
  'None',
  "I'dadiyyah (شهادة الإعدادية الإسلامية)",
  'Thanawiyyah (شهادة الثانوية الإسلامية)',
  'Diploma in Arabic & Islamic Studies',
  'B.A. Arabic / Islamic Studies',
  'M.A. Arabic / Islamic Studies',
  'Ph.D. Arabic / Islamic Studies',
]
