export interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public props: T;

  constructor(props: T) {
    const baseProps: any = {
      ...props,
    };

    this.props = baseProps;
  }

  public equals(valueObject: ValueObject<T>): boolean {
    if (valueObject === undefined) return false;

    return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
  }
}
