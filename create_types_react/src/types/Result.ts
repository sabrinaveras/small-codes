export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: string;
  private _value: T;

  private constructor(
    isSuccess: boolean,
    isFailure: boolean,
    error?: string,
    value?: T
  ) {
    this.isSuccess = isSuccess;
    this.isFailure = isFailure;
    this.error = error || "";
    this._value = value as T;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error("Can't get the value of an error result.");
    }

    return this._value;
  }

  public getError(): string {
    if (!this.isFailure) {
      throw new Error("Can't get the error os a successful result.");
    }

    return this.error;
  }

  public static void(): Result<void> {
    return new Result<void>(true, false, undefined);
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, false, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    if (!error) {
      throw new Error("An error message is mandatory");
    }

    return new Result<U>(false, true, error);
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export class Left<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}

export class Right<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }
}

export const left = <L, R>(l: L): Either<L, R> => {
  return new Left(l);
};

export const right = <L, R>(a: R): Either<L, R> => {
  return new Right<L, R>(a);
};
