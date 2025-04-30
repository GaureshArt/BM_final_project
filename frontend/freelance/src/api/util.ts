export function objectToFormData(obj: Record<string, any>): FormData {
    const formData = new FormData();
  
    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
  

      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      }

      else if (value instanceof File) {
        formData.append(key, value);
      }

      else {
        formData.append(key, value);
      }
    });
  
    return formData;
  }
  