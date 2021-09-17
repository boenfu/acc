declare module 'chinese-random-name' {
  const module: {
    generate(): string;

    names: {
      get3(format: string): string;
    };
  };

  export default module;
}
