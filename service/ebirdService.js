const EBIRD_API_KEY = process.env.EXPO_PUBLIC_EBIRD_API_KEY;

const CANARY_SPECIES = {
  speciesCode: 'saffin',
  commonName: 'Canário-da-terra',
  scientificName: 'Sicalis flaveola',
};

async function fetchEbirdObservations(
  latitude,
  longitude,
  backDays = 30,
  maxResults = 100,
  speciesCode = null,
  distKm = 25
) {
  if (!EBIRD_API_KEY) {
    throw new Error('Chave da eBird não encontrada.');
  }

  const base = 'https://api.ebird.org/v2/data/obs/geo';
  const endpoint = speciesCode
    ? `${base}/recent/${speciesCode}`
    : `${base}/recent`;

  const params = new URLSearchParams({
    lat: String(latitude),
    lng: String(longitude),
    back: String(Math.min(backDays, 30)),
    dist: String(distKm),
    maxResults: String(maxResults),
  });

  const url = `${endpoint}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      'X-eBirdApiToken': EBIRD_API_KEY,
    },
  });

  console.log('[eBird] GET', url);

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(
      `Erro eBird ${response.status}: ${bodyText || response.statusText}`
    );
  }

  return response.json();
}

function sumQuantity(observations) {
  return observations.reduce((total, bird) => total + (bird.howMany ?? 1), 0);
}

export async function getNearbyBirdObservations(latitude, longitude) {
  const data = await fetchEbirdObservations(
    latitude,
    longitude,
    30,
    100,
    CANARY_SPECIES.speciesCode,
    25
  );

  const totalQuantity = sumQuantity(data);

  return [
    {
      id: CANARY_SPECIES.speciesCode,
      speciesCode: CANARY_SPECIES.speciesCode,
      commonName: CANARY_SPECIES.commonName,
      scientificName: CANARY_SPECIES.scientificName,
      locationName: data[0]?.locName || 'Região selecionada',
      observedAt: data[0]?.obsDt || 'Sem registro recente',
      records: data.length,
      count: totalQuantity,
      latitude,
      longitude,
    },
  ];
}

export async function getBirdMonitoringStats(latitude, longitude, speciesCode) {
  const currentPeriodDays = 7;
  const baselinePeriodDays = 30;
  const radiusKm = 25;

  const selectedSpeciesCode = speciesCode || CANARY_SPECIES.speciesCode;

  const [currentData, baselineData] = await Promise.all([
    fetchEbirdObservations(
      latitude,
      longitude,
      currentPeriodDays,
      100,
      selectedSpeciesCode,
      radiusKm
    ),
    fetchEbirdObservations(
      latitude,
      longitude,
      baselinePeriodDays,
      100,
      selectedSpeciesCode,
      radiusKm
    ),
  ]);

  const currentQuantity = sumQuantity(currentData);
  const totalLast30DaysQuantity = sumQuantity(baselineData);

  const baselineDailyAverage =
    totalLast30DaysQuantity / Math.max(baselinePeriodDays, 1);

  const expectedQuantity =
    Math.round(baselineDailyAverage * currentPeriodDays) || 1;

  const currentRecords = currentData.length;
  const expectedRecords = Math.round(baselineData.length / 4) || 1;

  return {
    radiusKm,
    currentPeriodDays,
    baselinePeriodDays,

    currentQuantity,
    expectedQuantity,
    totalLast30DaysQuantity,

    currentRecords,
    expectedRecords,
  };
}