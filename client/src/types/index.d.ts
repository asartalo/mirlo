interface Paginated<T> {
  results: T[];
  limit: number;
  offset: number;
  pages: number;
}

interface LoggedInUser {
  email: string;
  name: string;
  id: number;
  artistUserSubscriptions?: ArtistUserSubscription[];
  isAdmin: boolean;
}

interface Track {
  title: string;
  id: number;
  status: "preview" | "must-own";
  artistId: number;
  trackGroup: TrackGroup;
  trackGroupId: number;
  image: Image;
  order: number;
  metadata: { [key: string]: any };
  audio?: {
    url: string;
    duration: number; // in seconds
    uploadState: "STARTED" | "SUCCESS" | "ERROR";
  };
  isPreview: boolean;
  trackArtists?: {
    role?: string;
    artistId?: number;
    artistName?: string;
    isCoAuthor?: boolean;
  }[];
}

interface TrackGroup {
  title: string;
  published: boolean;
  adminEnabled: boolean;
  id: number;
  type: "lp" | "ep" | "album" | "single";
  releaseDate: string;
  about: string;
  currency: string;
  credits: string;
  artist?: Artist;
  artistId: number;
  tracks: Track[];
  updatedAt: string;
  cover?: { id: number; url: string; sizes?: { [key: number]: string } };
  minPrice?: number; // in cents
  urlSlug?: string;
  userTrackGroupPurchases?: { userId: number }[];
}

interface Post {
  title: string;
  id: number;
  content: string;
  publishedAt: string;
  artist?: Artist;
  isPublic: boolean;
  artistId?: number;
}

type ArtistColors = {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
};

interface Artist {
  name: string;
  bio: string;
  urlSlug?: string;
  userId: number;
  id: number;
  enabled: boolean;
  trackGroups: TrackGroup[];
  payPalClientId?: string;
  posts: Post[];
  subscriptionTiers: ArtistSubscriptionTier[];
  properties?: {
    colors: ArtistColors;
  };
  banner?: {
    url: string;
    sizes?: { [key: string]: string };
  };
  avatar?: {
    url: string;
    sizes?: { [key: string]: string };
  };
}

interface User {
  id: number;
  email: string;
  name?: string;
  artists: Artist[];
  updatedAt: string;
}

interface ArtistSubscriptionTier {
  id: number;
  artistId: number;
  artist: Artist;
  minAmount?: number;
  name: string;
  description: string;
  isDefaultTier: boolean;
}

interface ArtistUserSubscription {
  id: number;
  amount: number;
  artistSubscriptionTierId: number;
  artistSubscriptionTier: ArtistSubscriptionTier;
}

interface UserTrackGroupPurchase {
  userId: number;
  trackGroupId: number;
  trackGroup?: TrackGroup;
  amountPaid: number;
  currency: number;
}

type AccountStatus = {
  chargesEnabled: boolean;
  detailsSubmitted: boolean;
};
