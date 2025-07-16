// Servicio para obtener imágenes de ejemplo curadas a mano
export async function getRealIceCreamImages(): Promise<string[]> {
    // URLs de imágenes de helados seleccionadas con cariño
    return [
        'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1570197788417-3346a1be7dee?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop'
    ];
}

export async function getRealCatImages(): Promise<string[]> {
    // URLs de imágenes de gatos seleccionadas con cariño
    return [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop'
    ];
}

export async function getRealDogImages(): Promise<string[]> {
    // URLs de imágenes de perros seleccionadas con cariño
    return [
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop'
    ];
}

export async function searchAndDownloadImages(query: string, count: number = 3): Promise<string[]> {
    try {
        let imageUrls: string[] = [];
        
        if (query.toLowerCase().includes('helado') || query.toLowerCase().includes('ice cream')) {
            imageUrls = await getRealIceCreamImages();
        } else if (query.toLowerCase().includes('gato') || query.toLowerCase().includes('cat')) {
            imageUrls = await getRealCatImages();
        } else if (query.toLowerCase().includes('perro') || query.toLowerCase().includes('dog')) {
            imageUrls = await getRealDogImages();
        } else {
            // Imágenes genéricas para otros casos, seleccionadas a mano
            imageUrls = [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop'
            ];
        }
        
        return imageUrls.slice(0, count);
    } catch (error) {
        console.error('Error buscando imágenes:', error);
        return [];
    }
}


