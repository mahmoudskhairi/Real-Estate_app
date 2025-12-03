-- Check if new columns exist in User table
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM 
    information_schema.columns
WHERE 
    table_name = 'User' 
    AND column_name IN ('emailNotifications', 'pushNotifications', 'smsNotifications', 'theme')
ORDER BY 
    column_name;

-- If empty, the migration hasn't run yet
