function _sanitizeRecursively(data) {
        if (Array.isArray(data)) {
            return data.map(item => _sanitizeRecursively(item));
        }

        if (data !== null && typeof data === 'object') {
            const sanitizedObject = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    sanitizedObject[key] = _sanitizeRecursively(data[key]);
                }
            }
            return sanitizedObject;
        }

        if (typeof data === 'string') {
            return DOMPurify.sanitize(data);
        }

        return data;
    }

    console.log("--- Original Malicious Data ---");
    console.log(JSON.stringify(maliciousJsonArray, null, 2));

    try {
        const sanitizedData = _sanitizeRecursively(maliciousJsonArray);
        output = sanitizedData;

    } catch (error) {
        console.error("An error occurred during the sanitization process:", error);
        output = maliciousJsonArray;
    }
