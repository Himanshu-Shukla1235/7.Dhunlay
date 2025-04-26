import React from "react";
import { useState } from "react";
import "./releasesP.css";
import ButtonC2 from "../../components/Buttons/buttonC2";
import BackupIcon from "@mui/icons-material/Backup";
import {
  ReleasedSongsProvider,
  useReleasedSongs,
} from "../../data/All released songs/getReleasedSongsByArtistName";
import {
  PrimaryArtistsProvider,
  usePrimaryArtists,
} from "../../components/primaryatistActions/getTotalPrimaryArtist";
import CardC2 from "../../components/Cards/cardsC2";
import PrimaryArtistSelector from "../../components/Selector/selectorC1";
import UpsertPrimaryArtistForm from "../../components/primaryatistActions/addPrimaryArtist";
// Total Releases Component
const TotalReleases = () => {
  const { songs } = useReleasedSongs();
  return (
    <div className="ReleasesP-main-sec-22">
      <p>Total Releases</p>
      <h2 style={{ zIndex: "1", fontSize: "5vw" }}>{songs.length}</h2>
    </div>
  );
};

// Songs List Component
const SongsList = () => {
  const { songs } = useReleasedSongs();

  return (
    <div className="releasesP-songs-list">
      {songs.length > 0 ? (
        <CardC2 songs={songs} />
      ) : (
        <p style={{ color: "white" }}>No released songs found.</p>
      )}
    </div>
  );
};

// Main Page
const ReleasesP = () => {
  return (
    <PrimaryArtistsProvider>
      <ReleasesPContent />
    </PrimaryArtistsProvider>
  );
};

const ReleasesPContent = () => {
  const { artists, loading } = usePrimaryArtists();
  const [selectedArtists, setSelectedArtists] = useState([]);

  if (loading) {
    return (
      <p style={{ color: "white", padding: "2rem" }}>Loading artists...</p>
    );
  }

  // Extract artist names as an array of strings (not objects)
  const artistNames = artists.map((a) => a.primaryArtistName);

  return (
    <div className="ReleasesP-main">
      {/* Section 1 */}
      <div className="ReleasesP-main-sec-1">
        <div className="ReleasesP-main-sec-11">
          <div className="ReleasesP-main-sec-11-steping"></div>
          <h2>
            Relea<span style={{ color: "white" }}>ses</span>
          </h2>
        </div>
      </div>

      {/* Section 2 */}
      <div className="ReleasesP-main-sec-2">
        <div className="ReleasesP-main-sec-21">
          <h4>Make a new release</h4>
          <p style={{ color: "white" }}>Feel the vibe. Live the rhythm.</p>
          <p style={{ color: "white" }}>
            Release your song to various platforms worldwide...
          </p>
          <button
            className="ReleasesP-main-sec-21-button-1"
            onClick={() => (window.location.href = "/release")}
          >
            Release
          </button>
        </div>

        {/* Wrap TotalReleases inside provider */}
        <ReleasedSongsProvider artistNames={selectedArtists}>
          <TotalReleases />
        </ReleasedSongsProvider>
      </div>

      {/* Section 3 */}
      <div className="ReleasesP-main-sec-3">
        <div className="ReleasesP-main-sec-31">
          <div>
            <PrimaryArtistSelector
              artistNames={artistNames} // Pass the artist names (strings)
              selectedArtists={selectedArtists}
              onChange={setSelectedArtists}
            />

            
          </div>
        </div>
        <div className="ReleasesP-main-sec-32"><div className="ReleasesP-main-sec-321"></div><UpsertPrimaryArtistForm></UpsertPrimaryArtistForm></div>
      </div>

      {/* Section 4 */}
      <div className="ReleasesP-main-sec-4">
        <h4>Released Songs</h4>
        <ReleasedSongsProvider artistNames={selectedArtists}>
          <SongsList />
        </ReleasedSongsProvider>
      </div>
    </div>
  );
};


export default ReleasesP;
