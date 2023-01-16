export type portion = 'sharing' | 'single';

export interface ITemDataModelInterface {
  readonly name: string;
  readonly description?: string;
  readonly portion: portion;
  readonly price: number;
  readonly quantity?: number;
  readonly image: string;
  readonly tags?: string[];
  readonly maximumPermitted: number;
  readonly taxRate?: number;
}
