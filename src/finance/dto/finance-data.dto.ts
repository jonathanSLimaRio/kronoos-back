import { Expose } from 'class-transformer';

export class FinanceDataDto {
  @Expose() nrInst: string;
  @Expose() nrAgencia: string;
  @Expose() cdClient: string;
  @Expose() nmClient: string;
  @Expose() nrCpfCnpj: string;
  @Expose() nrContrato: string;
  @Expose() dtContrato: string;
  @Expose() qtPrestacoes: number;
  @Expose() vlTotal: number;
  @Expose() cdProduto: string;
  @Expose() dsProduto: string;
  @Expose() cdCarteira: string;
  @Expose() dsCarteira: string;
  @Expose() nrProposta: string;
  @Expose() nrPresta: number;
  @Expose() tpPresta: string;
  @Expose() nrSeqPre: number;
  @Expose() dtVctPre: string;
  @Expose() vlPresta: number;
  @Expose() vlMora: number;
  @Expose() vlMulta: number;
  @Expose() vlOutAcr: number;
  @Expose() vlIof: number;
  @Expose() vlDescon: number;
  @Expose() vlAtual: number;
  @Expose() idSituac: string;
  @Expose() idSitVen: string;
}
