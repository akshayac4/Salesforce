public with sharing class PaginationController {
    public PaginationController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getDefault(){
        try {
            return [ SELECT Id, Name, Email, Phone, FirstName, LastName, Title, Salutation FROM Contact LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void saveContact(List<Contact> listt){
        update listt;   
    }

    @AuraEnabled
    public static List<Contact> searchContact(String firstName){

        List<Contact> conList = new List<Contact>();
        conList = [ SELECT Id, Name, Email, Phone, FirstName, LastName, Title, Salutation FROM Contact WHERE FirstName =: firstName ];
        return conList;
    }
}