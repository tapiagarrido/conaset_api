

export interface ResponseConsultaEstadoOk {

    applicant_full_name: string;
    applicant_rut: string;
    license_name: string;
    opportunity_number: number;
    application_status_name: string;
    municipality_name: string;
    date: string;

}

export interface ResponseConsultaEstadoError {
    message: string;
}