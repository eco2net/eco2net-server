import { etatLieux } from "./etatLieux.entity";

export class Report {
    switchMembreConseil: Boolean;
    switchCCR: Boolean;
    switchAgentService: Boolean;
    nameSite: String;
    nameGuardian: String;
    listetatLieux: etatLieux[]
}