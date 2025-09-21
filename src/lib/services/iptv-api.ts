// Servicio para consumir la API de IPTV-org
export interface Channel {
  id: string;
  name: string;
  country: string;
  language: string[];
  category: string;
  logo?: string;
  url?: string;
  tvg?: {
    id?: string;
    name?: string;
    url?: string;
  };
}

export interface Stream {
  channel: string;
  url: string;
  http_referrer?: string;
  user_agent?: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface Category {
  id: string;
  name: string;
}

class IPTVApiService {
  private baseUrl = 'https://iptv-org.github.io/api';

  async getChannels(): Promise<Channel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/channels.json`);
      if (!response.ok) {
        throw new Error(`Error fetching channels: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  }

  async getStreams(): Promise<Stream[]> {
    try {
      const response = await fetch(`${this.baseUrl}/streams.json`);
      if (!response.ok) {
        throw new Error(`Error fetching streams: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching streams:', error);
      throw error;
    }
  }

  async getCountries(): Promise<Country[]> {
    try {
      const response = await fetch(`${this.baseUrl}/countries.json`);
      if (!response.ok) {
        throw new Error(`Error fetching countries: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories.json`);
      if (!response.ok) {
        throw new Error(`Error fetching categories: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Método para obtener canales con sus streams
  async getChannelsWithStreams(): Promise<(Channel & { streams: Stream[] })[]> {
    try {
      const [channels, streams] = await Promise.all([
        this.getChannels(),
        this.getStreams()
      ]);

      // Crear un mapa de streams por canal
      const streamsByChannel = streams.reduce((acc, stream) => {
        if (!acc[stream.channel]) {
          acc[stream.channel] = [];
        }
        acc[stream.channel].push(stream);
        return acc;
      }, {} as Record<string, Stream[]>);

      // Combinar canales con sus streams
      return channels.map(channel => ({
        ...channel,
        streams: streamsByChannel[channel.id] || []
      }));
    } catch (error) {
      console.error('Error fetching channels with streams:', error);
      throw error;
    }
  }

  // Método para filtrar canales
  filterChannels(
    channels: Channel[],
    filters: {
      country?: string;
      category?: string;
      language?: string;
      search?: string;
    }
  ): Channel[] {
    return channels.filter(channel => {
      if (filters.country && channel.country !== filters.country) return false;
      if (filters.category && channel.category !== filters.category) return false;
      if (filters.language && !channel.language.includes(filters.language)) return false;
      if (filters.search && !channel.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }
}

export const iptvApi = new IPTVApiService();
