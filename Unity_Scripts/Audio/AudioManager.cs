using UnityEngine;

namespace PokerGame.Logic
{
    public class AudioManager : MonoBehaviour
    {
        public static AudioManager Instance;
        
        [Header("Audio Sources")]
        public AudioSource sfxSource;
        public AudioSource musicSource;
        
        [Header("Sound Effects")]
        public AudioClip cardDealSound;
        public AudioClip cardFlipSound;
        public AudioClip chipSound;
        public AudioClip buttonClickSound;
        public AudioClip winSound;
        public AudioClip loseSound;
        
        [Header("Settings")]
        [Range(0f, 1f)] public float sfxVolume = 1f;
        [Range(0f, 1f)] public float musicVolume = 0.5f;
        
        void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(gameObject);
            }
        }
        
        void Start()
        {
            UpdateVolumes();
        }
        
        public void UpdateVolumes()
        {
            if (sfxSource != null)
                sfxSource.volume = sfxVolume;
                
            if (musicSource != null)
                musicSource.volume = musicVolume;
        }
        
        public void PlayCardDeal()
        {
            PlaySFX(cardDealSound);
        }
        
        public void PlayCardFlip()
        {
            PlaySFX(cardFlipSound);
        }
        
        public void PlayChipSound()
        {
            PlaySFX(chipSound);
        }
        
        public void PlayButtonClick()
        {
            PlaySFX(buttonClickSound);
        }
        
        public void PlayWinSound()
        {
            PlaySFX(winSound);
        }
        
        public void PlayLoseSound()
        {
            PlaySFX(loseSound);
        }
        
        void PlaySFX(AudioClip clip)
        {
            if (sfxSource != null && clip != null)
            {
                sfxSource.PlayOneShot(clip);
            }
        }
        
        public void SetSFXVolume(float volume)
        {
            sfxVolume = Mathf.Clamp01(volume);
            UpdateVolumes();
        }
        
        public void SetMusicVolume(float volume)
        {
            musicVolume = Mathf.Clamp01(volume);
            UpdateVolumes();
        }
    }
}