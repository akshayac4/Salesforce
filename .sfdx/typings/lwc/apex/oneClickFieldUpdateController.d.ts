declare module "@salesforce/apex/oneClickFieldUpdateController.getDefault" {
  export default function getDefault(param: {ObjectName: any, FieldName: any, recordId: any}): Promise<any>;
}
declare module "@salesforce/apex/oneClickFieldUpdateController.updateRecord" {
  export default function updateRecord(param: {FieldName: any, FieldValue: any, RecordId: any}): Promise<any>;
}
declare module "@salesforce/apex/oneClickFieldUpdateController.getStageName" {
  export default function getStageName(param: {ObjectName: any, FieldName: any}): Promise<any>;
}
