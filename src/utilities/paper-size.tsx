type DPI = 72 | 300;
export enum A_SERIES_PAPER {
  A0 = 'A0',
  A1 = 'A1',
  A2 = 'A2',
  A3 = 'A3',
  A4 = 'A4',
  A5 = 'A5',
  A6 = 'A6',
  A7 = 'A7',
  A8 = 'A8',
  A9 = 'A9',
  A10 = 'A10',
}

export type PaperName = A_SERIES_PAPER;

class PaperSize {
  public constructor(
    public name: PaperName,
    public width: number,
    public height: number,
    public dpi = 72,
  ) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.dpi = dpi;
  }

  portrait() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  landscape() {
    return {
      width: this.height,
      height: this.width,
    };
  }
}

const PAPER_SIZES = new Map<PaperName, PaperSize>([
  [A_SERIES_PAPER.A0, new PaperSize(A_SERIES_PAPER.A0, 2384, 3370)],
  [A_SERIES_PAPER.A1, new PaperSize(A_SERIES_PAPER.A1, 1684, 2384)],
  [A_SERIES_PAPER.A2, new PaperSize(A_SERIES_PAPER.A2, 1191, 1684)],
  [A_SERIES_PAPER.A3, new PaperSize(A_SERIES_PAPER.A3, 842, 1191)],
  [A_SERIES_PAPER.A4, new PaperSize(A_SERIES_PAPER.A4, 595, 842)],
  [A_SERIES_PAPER.A5, new PaperSize(A_SERIES_PAPER.A5, 420, 595)],
  [A_SERIES_PAPER.A6, new PaperSize(A_SERIES_PAPER.A6, 298, 420)],
  [A_SERIES_PAPER.A7, new PaperSize(A_SERIES_PAPER.A7, 210, 298)],
  [A_SERIES_PAPER.A8, new PaperSize(A_SERIES_PAPER.A8, 147, 210)],
  [A_SERIES_PAPER.A9, new PaperSize(A_SERIES_PAPER.A9, 105, 147)],
  [A_SERIES_PAPER.A10, new PaperSize(A_SERIES_PAPER.A10, 74, 105)],
]);

export { PAPER_SIZES };
