export default function ({ app }, inject) {
    let loadTimeoutId = null;

    const api = {
        users: {
            list: async (offset, limit = 50) => {
                try {
                    const response = await fetch(
                        `http://localhost:3000/api/users?offset=${offset}&limit=${limit}`,
                    );

                    if (!response.ok) {
                        throw new Error(`Ошибка HTTP: ${response.status}`);
                    }

                    const data = await response.json();

                    if (data.error) {
                        throw new Error(data.message || "Ошибка сервера");
                    }

                    if (loadTimeoutId) {
                        clearTimeout(loadTimeoutId);
                        loadTimeoutId = null;
                    }

                    return new Promise((resolve) => {
                        loadTimeoutId = setTimeout(() => {
                            resolve(data);
                            loadTimeoutId = null;
                        }, 500);
                    });
                } catch (error) {
                    console.error("Ошибка при получении списка:", error);

                    if (loadTimeoutId) {
                        clearTimeout(loadTimeoutId);
                        loadTimeoutId = null;
                    }

                    return [];
                }
            },
        },

        resetCache: () => {
            if (loadTimeoutId) {
                clearTimeout(loadTimeoutId);
                loadTimeoutId = null;
            }
        },
    };

    inject("api", api);
}
