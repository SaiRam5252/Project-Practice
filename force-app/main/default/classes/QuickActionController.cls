public with sharing class QuickActionController 
{
    @AuraEnabled
    public static void createAccount(String name, String phone, String parentRecordId)
    {
        //Changed
        try 
        {
            List<Account> lstAccountsToInsert = new List<Account>();

            Account accRecord = new Account();
            accRecord.Name = name;
            accRecord.Phone = phone;
            accRecord.ParentId = parentRecordId;
            lstAccountsToInsert.add(accRecord);

            if (!lstAccountsToInsert.isEmpty()) 
            {
                Insert lstAccountsToInsert;
            }  
        } 
        catch (Exception ex) 
        {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}