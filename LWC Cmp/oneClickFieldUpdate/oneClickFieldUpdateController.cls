public with sharing class oneClickFieldUpdateController {
    public oneClickFieldUpdateController() {

    }

    @AuraEnabled
    public static List<sObjWrapper> getDefault(String ObjectName, String FieldName, String recordId){
        
        List<sObject> recordList = new List<sObject>();

        String query = ' SELECT Id, Name, '+FieldName+' FROM '+ObjectName+' WHERE Id =: recordId ';

        recordList = Database.query(query);

        List<sObjWrapper> sObjWrapper = new List<sObjWrapper>();
        List<stageNameWrapper> stageNameWrapperList = new List<stageNameWrapper>();
        
        Map<String, Schema.SObjectType> sObjectMap = Schema.getGlobalDescribe();

        Schema.SObjectType sObjectTypeInstance = sObjectMap.get(ObjectName);

        Map<String, Schema.SObjectField> fieldMap = sObjectTypeInstance.getDescribe().fields.getMap();

        System.debug(fieldMap.get(FieldName));

        for(SObject rec : recordList){
            sObjWrapper sow = new sObjWrapper();
            sow.Name = (String) rec.get('Name');
            stageNameWrapperList = getStageName(ObjectName, FieldName);
            for(stageNameWrapper snw : stageNameWrapperList){
                if(snw.StageName == rec.get(FieldName)){
                    if(snw.selected) continue;
                    snw.selected = true;
                    break;
                }
            }
            sow.stageNameList = stageNameWrapperList;
            sObjWrapper.add(sow);
        }

        return sObjWrapper;
    }

    @AuraEnabled
    public static List<stageNameWrapper> getStageName(String ObjectName, String FieldName){
        List<stageNameWrapper> pickValList = new List<stageNameWrapper>();
        
		DescribeSObjectResult objResult = Schema.getGlobalDescribe().get(ObjectName).getDescribe();
                                    
        DescribeFieldResult fieldResult = objResult.fields.getMap().get(FieldName).getDescribe();

		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){

            System.debug(pickListVal);
		
            if(pickListVal.isActive()){
                stageNameWrapper pvl = new stageNameWrapper();
                pvl.StageName = pickListVal.getLabel();
                pvl.StageNameAPI = pickListVal.getValue();
                pvl.selected = false;
                pickValList.add(pvl);
            }
		}
		return pickValList;
    }

    public class sObjWrapper{
        @AuraEnabled public String Name;
        @AuraEnabled public List<stageNameWrapper> stageNameList;
    }

    public class stageNameWrapper{
        @AuraEnabled public String StageName;
        @AuraEnabled public String StageNameAPI;
        @AuraEnabled public Boolean selected;
    }
}