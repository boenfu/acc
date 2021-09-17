import randomName from 'chinese-random-name';

const adjectives = [
  '善良',
  '温柔',
  '柔弱',
  '聪明',
  '机智',
  '成熟',
  '稳重',
  '可爱',
  '大气',
  '强壮',
  '热情',
  '幸运',
  '努力',
  '勇敢',
  '诚实',
];

export const getRandomName = (): string =>
  `${
    adjectives[Math.floor(Math.random() * adjectives.length)]
  }的${randomName.generate()}`;
