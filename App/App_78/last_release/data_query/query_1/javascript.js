 function _sanitizeRecursively(value) {
        if (Array.isArray(value)) {
            return value.map(item => _sanitizeRecursively(item));
        }

        if (value !== null && typeof value === 'object') {
            const sanitizedObject = {};
            for (const key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    sanitizedObject[key] = _sanitizeRecursively(value[key]);
                }
            }
            return sanitizedObject;
        }

        if (typeof value === 'string') {
            return DOMPurify.sanitize(value);
        }

        return value;
    }

    console.log("--- Original Data from API ---");
    console.log(JSON.stringify(data, null, 2));

    try {
        const sanitizedData = _sanitizeRecursively(data);
        
        console.log("\n--- Sanitized Data (Transform Output) ---");
        console.log(JSON.stringify(sanitizedData, null, 2));
        
        return sanitizedData;

    } catch (error) {
        console.error("An error occurred during the sanitization process:", error);
        return data;
    }