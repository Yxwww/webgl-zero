declare interface NodeModule {
  hot: {
    accept(path?: string, callback?: () => void): void
  }
}

type Maybe<T> = T | void;

