export const isValidExcelFile = (file: File): boolean => {
  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    '.xlsx',
    '.xls'
  ];
  return validTypes.some(type => 
    file.type === type || file.name.toLowerCase().endsWith(type)
  );
};