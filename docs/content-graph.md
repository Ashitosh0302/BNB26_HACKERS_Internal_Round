# Multimodal Content Graph Specification

## The Mathematical Foundation of CreatorAi

CreatorAi's core differentiator is the **Multimodal Content Graph**. Rather than storing disconnected flat records, every entity in the creator lifecycle is represented as a typed node connected by directional semantic edges.

---

## 1. Graph Topology

```text
               [Mission Node]
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
   [Script Node]         [Recording Node]
         │                       │
         ▼                       ▼
  [Section Nodes]          [Scene Nodes]
         │                       │
         └───────────┬───────────┘
                     │ (Aligned By AlignmentAgent)
                     ▼
           [Clip Candidate Nodes]
                     │
                     ▼
             [Edit Plan Nodes]
                     │
         ┌───────────┼───────────┐
         ▼           ▼           ▼
     [Shorts]     [Reels]    [LinkedIn]
```

---

## 2. Node Types & Attributes

1. **Mission Node (`mission`)**: The parent container representing a complete topic or recording session.
2. **Script Node (`script`)**: Hierarchical breakdown into Hook, Intro, Core Explanation, Technical Proof, CTA.
3. **Recording Node (`recording`)**: Raw video file, acoustic loudness profile, word-level transcript.
4. **Scene Node (`scene`)**: Visual boundaries detected via frame contrast and optical flow.
5. **Clip Candidate Node (`clip`)**: High-value candidate segment evaluated against 6 criteria.
6. **Repurposed Node (`repurpose`)**: Platform-specific packaging with custom aspect ratios, copy, and scheduling.

---

## 3. Directional Relationships

- `decomposes_to`: Project breaks down into structured script.
- `recorded_as`: Script corresponds to long-form video.
- `contains_scene`: Video contains optical scene cuts.
- `aligned_with`: Script paragraphs matched with exact timestamp intervals in video.
- `extracted_from`: Short clips carved out from high-energy scenes.
- `repurposed_into`: Clips transformed for specific social distribution channels.
