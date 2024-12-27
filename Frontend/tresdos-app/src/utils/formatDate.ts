interface ReportData {
    id: number;
    start_date: string;
    end_date: string;
  }
  export const formatDates = (data: ReportData[]): ReportData[] => {
    return data.map(item => {
      const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };
  
      return {
        ...item,
        start_date: formatDate(item.start_date),
        end_date: formatDate(item.end_date),
      };
    });
  }
  