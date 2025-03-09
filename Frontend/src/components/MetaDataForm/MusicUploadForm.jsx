import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./MusicUploadForm.css";

const schema = yup.object().shape({
  songTitle: yup.string().required("Song title is required"),
  primaryArtist: yup.string().required("Primary artist is required"),
  featuringArtists: yup.array().of(yup.string()),
  author: yup.string().required("Author name is required"),
  composer: yup.string().required("Composer name is required"),
  musicProducer: yup.string().required("Music Producer is required"),
  musicDirector: yup.string().required("Music Director is required"),
  lyrics: yup.string().required("Lyrics are required"),
  coverArt: yup.string().url("Cover Art must be a valid URL").required("Cover Art URL is required"),
  songFile: yup.object().shape({
    format: yup
      .string()
      .oneOf(["MP3", "WAV", "FLAC", "AAC"], "Invalid format")
      .required("Format is required"),
    fileUrl: yup.string().url("File URL must be valid").required("Song file URL is required"),
  }),
  releaseDate: yup.date().required("Release date is required"),
  genres: yup.array().of(yup.string()).min(1, "At least one genre is required"),
  language: yup.string().required("Language is required"),
  explicitContent: yup.boolean(),
  distributionPlatforms: yup.array().of(yup.string()).min(1, "Select at least one platform"),
  metadata: yup.object().shape({
    isrc: yup.string().required("ISRC is required"),
    upc: yup.string().required("UPC is required"),
    bpm: yup.number().min(30, "BPM too low").max(300, "BPM too high").required("BPM is required"),
    key: yup.string().required("Key is required"),
    mood: yup.string().required("Mood is required"),
  }),
});

const MusicUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/metadata/meta", {
        method: "POST",
        credentials: "include", // ✅ Allows cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="music-form-container">
      <h2>Upload Your Music</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("songTitle")} placeholder="Song Title" />
        <p>{errors.songTitle?.message}</p>

        <input {...register("primaryArtist")} placeholder="Primary Artist" />
        <p>{errors.primaryArtist?.message}</p>

        <input {...register("author")} placeholder="Author" />
        <p>{errors.author?.message}</p>

        <input {...register("composer")} placeholder="Composer" />
        <p>{errors.composer?.message}</p>

        <input {...register("musicProducer")} placeholder="Music Producer" />
        <p>{errors.musicProducer?.message}</p>

        <input {...register("musicDirector")} placeholder="Music Director" />
        <p>{errors.musicDirector?.message}</p>

        <input {...register("lyrics")} placeholder="Lyrics" />
        <p>{errors.lyrics?.message}</p>

        <input {...register("coverArt")} placeholder="Cover Art URL" />
        <p>{errors.coverArt?.message}</p>

        <input {...register("songFile.fileUrl")} placeholder="Song File URL" />
        <p>{errors.songFile?.fileUrl?.message}</p>

        <select {...register("songFile.format")}>
          <option value="">Select Format</option>
          <option value="MP3">MP3</option>
          <option value="WAV">WAV</option>
          <option value="FLAC">FLAC</option>
          <option value="AAC">AAC</option>
        </select>
        <p>{errors.songFile?.format?.message}</p>

        <input type="date" {...register("releaseDate")} />
        <p>{errors.releaseDate?.message}</p>

        <input {...register("genres.0")} placeholder="Genre" />
        <p>{errors.genres?.message}</p>

        <input {...register("language")} placeholder="Language" />
        <p>{errors.language?.message}</p>

        <input type="checkbox" {...register("explicitContent")} /> Explicit Content

        <input {...register("metadata.isrc")} placeholder="ISRC" />
        <p>{errors.metadata?.isrc?.message}</p>

        <input {...register("metadata.upc")} placeholder="UPC" />
        <p>{errors.metadata?.upc?.message}</p>

        <input type="number" {...register("metadata.bpm")} placeholder="BPM" />
        <p>{errors.metadata?.bpm?.message}</p>

        <input {...register("metadata.key")} placeholder="Key" />
        <p>{errors.metadata?.key?.message}</p>

        <input {...register("metadata.mood")} placeholder="Mood" />
        <p>{errors.metadata?.mood?.message}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MusicUploadForm;
